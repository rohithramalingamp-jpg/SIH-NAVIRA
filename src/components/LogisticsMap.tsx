import { useEffect, useMemo } from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { calculateCorridorRisk } from "../services/riskEngine";
import { corridors, vehicles, facilities, incidents } from "../data/mockData";
import LayerLegend from "./LayerLegend";

function InvalidateOnMount() {
  const map = useMap();
  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 200);
    return () => clearTimeout(t);
  }, [map]);
  return null;
}

function markerIcon(color: string, label: string) {
  return L.divIcon({ className: "", html: `<div class="map-pin" style="background:${color}">${label}</div>`, iconSize: [26, 26], iconAnchor: [13, 13] });
}

const origin: [number, number] = [26.14, 91.74]; // Guwahati
const dest: [number, number] = [25.6, 94.36]; // Remote Medical Center (Manipur)

const routePaths: Record<string, [number, number][]> = {
  // A: Fastest — straight-ish northern highway
  A: [origin, [26.05, 92.3], [25.85, 92.9], [25.7, 93.5], [25.65, 94.0], dest],
  // B: Recommended — central balanced path
  B: [origin, [25.9, 92.15], [25.65, 92.6], [25.5, 93.1], [25.5, 93.6], [25.55, 94.1], dest],
  // C: Fuel efficient — southern flatter path
  C: [origin, [25.75, 91.95], [25.45, 92.4], [25.25, 92.95], [25.3, 93.5], [25.4, 94.05], dest],
  // D: Shortest — tight diagonal shortcut
  D: [origin, [25.95, 92.0], [25.55, 92.45], [25.2, 93.0], [25.15, 93.6], [25.45, 94.15], dest],
  // E: All-Weather — far northern valley bypass
  E: [origin, [26.4, 92.4], [26.2, 93.0], [26.0, 93.6], [25.85, 94.1], dest],
};

const routeLabels: Record<string, { name: string; color: string }> = {
  A: { name: "Fastest (NH-37)", color: "#ef4444" },
  B: { name: "AI Recommended", color: "#16a34a" },
  C: { name: "Fuel Efficient", color: "#f59e0b" },
  D: { name: "Shortest (Hill Road)", color: "#f97316" },
  E: { name: "All-Weather (Valley)", color: "#0b5cad" },
};

export default function LogisticsMap({ demoRunning, routeMode = false, selectedRoute }: { demoRunning?: boolean; routeMode?: boolean; selectedRoute?: string | null }) {
  const statusColor = (status: string) => status === "Blocked" ? "#dc2626" : status === "High Risk" ? "#f97316" : status === "Moderate" ? "#f59e0b" : "#16a34a";
  const vehicleColor = (status: string) => status === "Critical" ? "#dc2626" : status === "Delayed" ? "#f59e0b" : status === "Emergency support" ? "#2563eb" : "#16a34a";

  const routes = useMemo(() => routeMode ? [] : corridors.slice(0, demoRunning ? 12 : 9), [routeMode, demoRunning]);
  const routeIds = ["A", "B", "C", "D", "E"];

  return (
    <div className="relative h-[480px] w-full overflow-hidden rounded-lg bg-[#dbe7e9]">
      <MapContainer center={[25.7, 92.9]} zoom={7} scrollWheelZoom={false} className="h-full w-full" style={{ height: "480px", width: "100%", background: "#dbe7e9" }}>
        <InvalidateOnMount />
        <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {routeMode && routeIds.map((id) => {
          const isSelected = selectedRoute === id;
          const dimmed = selectedRoute && !isSelected;
          const { color, name } = routeLabels[id];
          return (
            <Polyline
              key={id}
              positions={routePaths[id]}
              pathOptions={{
                color: isSelected ? color : dimmed ? "#cbd5e1" : color,
                weight: isSelected ? 9 : 5,
                opacity: dimmed ? 0.3 : 0.9,
                dashArray: id === "B" ? undefined : isSelected ? undefined : "8 6",
              }}
            >
              <Popup>
                <div className="max-w-xs">
                  <b>Route {id} — {name}</b>
                  <div>From: Guwahati Hub</div>
                  <div>To: Remote Medical Center</div>
                  <div>Click a route card below to select</div>
                </div>
              </Popup>
            </Polyline>
          );
        })}

        {routeMode && (
          <>
            <Marker position={origin} icon={L.divIcon({ className: "", html: `<div class="map-pin" style="background:#0b5cad;font-weight:900">O</div>`, iconSize: [30, 30], iconAnchor: [15, 15] })}>
              <Popup><b>Origin</b><div>Guwahati Hub</div></Popup>
            </Marker>
            <Marker position={dest} icon={L.divIcon({ className: "", html: `<div class="map-pin" style="background:#7c3aed;font-weight:900">D</div>`, iconSize: [30, 30], iconAnchor: [15, 15] })}>
              <Popup><b>Destination</b><div>Remote Medical Center</div></Popup>
            </Marker>
          </>
        )}

        {!routeMode && routes.map((corridor, index) => {
          const risk = calculateCorridorRisk(corridor);
          const color = statusColor(demoRunning && index === 2 ? "High Risk" : corridor.status);
          return (
            <Polyline key={corridor.id} positions={corridor.path.map((p) => [p.lat, p.lng])} pathOptions={{ color, weight: 5, opacity: 0.85 }}>
              <Popup>
                <div className="max-w-xs">
                  <b>Corridor: {corridor.name}</b>
                  <div>Risk Score: {risk.score}/100</div>
                  <div>Status: {demoRunning && index === 2 ? "HIGH RISK" : corridor.status}</div>
                  <div>Primary Risk: Heavy rainfall + landslide probability</div>
                  <div>Predicted Delay: +2h 15m</div>
                  <div>Recommended Action: Use Alternate Route B</div>
                  <p>AI Explanation: Rainfall intensity and two nearby road incidents have increased disruption probability.</p>
                </div>
              </Popup>
            </Polyline>
          );
        })}

        {!routeMode && vehicles.slice(0, demoRunning ? 20 : 16).map((vehicle) => (
          <Marker key={vehicle.id} position={[vehicle.position.lat, vehicle.position.lng]} icon={markerIcon(vehicleColor(vehicle.status), "T")}>
            <Popup>
              <b>{vehicle.id}</b>
              <div>{vehicle.cargo}</div>
              <div>{vehicle.status}</div>
              <div>{vehicle.connectivity}</div>
            </Popup>
          </Marker>
        ))}
        {!routeMode && facilities.slice(0, 18).map((facility) => (
          <Marker key={facility.id} position={[facility.position.lat, facility.position.lng]} icon={markerIcon(facility.type === "Hospital" ? "#7c3aed" : facility.type === "District Control" ? "#0f172a" : "#0891b2", facility.type === "Hospital" ? "H" : "S")}>
            <Popup>
              <b>{facility.name}</b>
              <div>{facility.type}</div>
            </Popup>
          </Marker>
        ))}
        {!routeMode && incidents.slice(0, demoRunning ? 10 : 6).map((incident) => (
          <Marker key={incident.id} position={[incident.position.lat, incident.position.lng]} icon={markerIcon(incident.severity === "CRITICAL" ? "#991b1b" : "#f97316", "!")}>
            <Popup>
              <b>{incident.id}</b>
              <div>{incident.type}</div>
              <div>{incident.status}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {routeMode && (
        <div className="absolute right-2 top-2 z-[1000] rounded-lg border border-slate-200 bg-white/95 p-2 shadow-lg">
          <div className="mb-1.5 text-xs font-bold uppercase text-slate-500">Routes</div>
          {routeIds.map((id) => (
            <div key={id} className="flex items-center gap-1.5 py-0.5 text-xs font-bold" style={{ opacity: selectedRoute && selectedRoute !== id ? 0.4 : 1 }}>
              <span className="inline-block h-2.5 w-6 rounded-full" style={{ background: routeLabels[id].color }} />
              <span>{id}</span>
            </div>
          ))}
        </div>
      )}

      <div className="absolute bottom-2 left-2 z-[1000]">
        <LayerLegend />
      </div>
    </div>
  );
}
