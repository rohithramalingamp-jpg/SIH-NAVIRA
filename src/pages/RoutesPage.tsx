import { useState } from "react";
import Icon from "../components/Icon";
import PageFrame from "../components/PageFrame";
import Panel from "../components/Panel";
import LogisticsMap from "../components/LogisticsMap";
import {
  routeOptions, optimizeRoute,
  origins, destinations, cargoTypes, priorities, vehicleTypes,
} from "../services/routeEngine";
import clsx from "clsx";

const constraints = [
  { id: "exclude", label: "Exclude NH-06 Jowai Sector", note: "Active Mudslide reported at KM 118", defaultOn: true },
  { id: "bypass", label: "Allow BRO Military Bypass", note: "Border Roads Org Escort Clearances applied", defaultOn: true },
  { id: "evac", label: "Prioritize Evacuation Corridors", note: "Includes dedicated medical waystation access", defaultOn: false },
];

export default function RoutesPage() {
  const [origin, setOrigin] = useState(origins[0]);
  const [destination, setDestination] = useState(destinations[0]);
  const [cargo, setCargo] = useState(cargoTypes[0]);
  const [priority, setPriority] = useState(priorities[0]);
  const [vehicle, setVehicle] = useState(vehicleTypes[0]);
  const [activeConstraints, setActiveConstraints] = useState<string[]>(constraints.filter(c => c.defaultOn).map(c => c.id));
  const [riskTolerance, setRiskTolerance] = useState<"ULTRA SAFE" | "BALANCED" | "TACTICAL EXPEDIENT">("BALANCED");

  const [optimizing, setOptimizing] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [selected, setSelected] = useState<string>("B");
  const [result, setResult] = useState<ReturnType<typeof optimizeRoute> | null>(null);
  const [deployed, setDeployed] = useState(false);

  const run = () => {
    setOptimizing(true);
    setConfirmed(false);
    setDeployed(false);
    setResult(null);
    window.setTimeout(() => {
      const r = optimizeRoute({ origin, destination, cargo, priority, vehicle });
      setResult(r);
      setSelected(r.recommendedId);
      setConfirmed(true);
      setOptimizing(false);
    }, 1300);
  };

  const selectedRoute = routeOptions.find((r) => r.id === selected);

  const toggleConstraint = (id: string) => {
    setActiveConstraints(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  const fields: [string, string, string[], (v: string) => void][] = [
    ["Origin", origin, origins, setOrigin],
    ["Destination", destination, destinations, setDestination],
    ["Cargo Type", cargo, cargoTypes, setCargo],
    ["Priority", priority, priorities, setPriority],
    ["Vehicle Type", vehicle, vehicleTypes, setVehicle],
  ];

  return (
    <PageFrame title="AI Dynamic Route Optimizer" subtitle="Multi-corridor risk-weighted path computation across terrain hazards, monsoon saturation, and active choke points.">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded bg-[#0b5cad] px-2 py-1 text-xs font-bold text-white">ENGINE V4.8-NER</span>
        <span className="flex items-center gap-1 rounded border border-emerald-300 bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700"><span className="h-2 w-2 rounded-full bg-emerald-500" /> IMD RADAR: ACTIVE (Cherrapunji-Silchar)</span>
        <span className="rounded border border-blue-300 bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700">GIS TOPOGRAPHIC</span>
        <span className="rounded border border-slate-300 bg-white px-2 py-1 text-xs font-bold text-slate-700">Compare Corridors</span>
        <span className="rounded border border-slate-300 bg-white px-2 py-1 text-xs font-bold text-slate-700">Export Manifest</span>
      </div>

      <div className="grid gap-3 xl:grid-cols-[420px_1fr]">
        {/* Left: Route Parameters */}
        <div className="space-y-3">
          <Panel title="Route Parameters" icon="mdi:navigation">
            <div className="mb-1 text-xs font-bold text-slate-500">MISSION ID: #NER-8821</div>
            <div className="space-y-2">
              {fields.map(([label, value, options, setValue]) => (
                <label key={label} className="block text-sm font-bold text-slate-600">
                  {label}
                  <select
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="mt-1 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-900"
                  >
                    {options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </label>
              ))}
              <button onClick={run} disabled={optimizing} className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#0b5cad] font-bold text-white transition hover:bg-[#094a8a] disabled:opacity-50">
                {optimizing ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <Icon icon="mdi:check-decagram" className="h-5 w-5" />} Re-compute Multi-Corridor Paths
              </button>
            </div>
          </Panel>

          <Panel title="Risk Tolerance Profile" icon="mdi:gauge">
            <div className="rounded-lg bg-blue-50 p-2 text-xs font-bold text-blue-800">
              {riskTolerance === "ULTRA SAFE" ? "Avoid Slopes > 15% | Pavement Saturation > 40%" : riskTolerance === "BALANCED" ? "Avoid Slopes > 25% | Pavement Saturation > 60%" : "Avoid Slopes > 40% | Pavement Saturation > 80%"}
            </div>
            <div className="mt-2 flex gap-1">
              {(["ULTRA SAFE", "BALANCED", "TACTICAL EXPEDIENT"] as const).map(r => (
                <button key={r} onClick={() => setRiskTolerance(r)} className={clsx("flex-1 rounded px-2 py-2 text-xs font-bold transition", riskTolerance === r ? "bg-[#0b5cad] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")}>{r}</button>
              ))}
            </div>
          </Panel>

          <Panel title="Dynamic Routing Constraints" icon="mdi:checkbox-marked-outline">
            <div className="space-y-2">
              {constraints.map(c => (
                <label key={c.id} className="flex cursor-pointer items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2.5 hover:border-slate-300">
                  <input type="checkbox" checked={activeConstraints.includes(c.id)} onChange={() => toggleConstraint(c.id)} className="mt-0.5 h-4 w-4 accent-[#0b5cad]" />
                  <div>
                    <div className="text-sm font-bold text-slate-800">{c.label}</div>
                    <div className="text-xs text-red-600">{c.note}</div>
                  </div>
                </label>
              ))}
            </div>
          </Panel>
        </div>

        {/* Right: Map + Results */}
        <div className="space-y-3">
          <div className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
            <div className="mb-1 flex items-center justify-between px-1">
              <div className="text-xs font-bold text-slate-600">North Eastern Corridor Terrain Vector Matrix (NH-06 / SH-12 / NH-27)</div>
              <div className="text-xs font-bold text-slate-500">ELEVATION RANGE: 42m – 1,498m</div>
            </div>
            <LogisticsMap routeMode selectedRoute={confirmed ? selected : null} />
          </div>

          {!confirmed ? (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-bold text-slate-500">
              Set your shipment inputs and click <span className="text-[#0b5cad]">Re-compute Multi-Corridor Paths</span> to generate optimized route options
            </div>
          ) : (
            <>
              {/* Route cards */}
              <div className="grid gap-3 md:grid-cols-3">
                {routeOptions.slice(0, 3).map((route) => {
                  const isRecommended = route.id === result?.recommendedId;
                  const riskLabel = route.risk > 70 ? "HIGH RISK" : route.risk > 50 ? "MODERATE" : "LOW RISK";
                  const riskColor = route.risk > 70 ? "text-red-700 bg-red-50 border-red-200" : route.risk > 50 ? "text-amber-700 bg-amber-50 border-amber-200" : "text-emerald-700 bg-emerald-50 border-emerald-200";
                  return (
                    <button
                      key={route.id}
                      onClick={() => setSelected(route.id)}
                      className={clsx(
                        "flex flex-col rounded-lg border p-4 text-left shadow-sm transition",
                        selected === route.id ? "border-[#0b5cad] bg-blue-50 ring-2 ring-[#0b5cad]/30" : isRecommended ? "border-emerald-400 bg-emerald-50 hover:border-emerald-600" : "border-slate-200 bg-white hover:border-slate-400"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase text-slate-500">Route {route.id}</span>
                        {isRecommended && <span className="rounded bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">AI RECOMMENDED CORRIDOR</span>}
                      </div>
                      <div className={clsx("mt-2 rounded border px-2 py-1.5 text-sm font-bold", riskColor)}>
                        {riskLabel}: {route.risk}/100
                      </div>
                      <div className="mt-2 text-lg font-bold text-slate-900">{route.label}</div>
                      <div className="mt-1 text-sm text-slate-600">{route.road}</div>
                      <p className="mt-2 text-xs leading-4 text-slate-600">{route.note}.</p>
                      <div className="mt-3 space-y-1.5 border-t border-slate-100 pt-2 text-xs">
                        <div className="flex justify-between"><span className="text-slate-500">Distance:</span><b>{route.distance}</b></div>
                        <div className="flex justify-between"><span className="text-slate-500">Operational ETA:</span><b>{route.eta}</b></div>
                        <div className="flex justify-between"><span className="text-slate-500">Fuel Consumption:</span><b>{route.fuel}</b></div>
                        <div className="flex justify-between"><span className="text-slate-500">Max Incline Grade:</span><b style={{ color: route.risk > 60 ? "#dc2626" : route.risk > 40 ? "#d97706" : "#16a34a" }}>{route.risk > 60 ? "28.4% (Dangerous)" : route.risk > 40 ? "14.0% (Stable)" : "11.8% (Flat valley)"}</b></div>
                      </div>
                      <div className="mt-auto pt-3">
                        {isRecommended ? (
                          <span onClick={(e) => { e.stopPropagation(); setDeployed(true); }} className="flex w-full items-center justify-center gap-1.5 rounded bg-[#0b5cad] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#094a8a]">
                            <Icon icon="mdi:send" className="h-4 w-4" /> {deployed ? "Deployed ✓" : "Deploy & Dispatch Convoy"}
                          </span>
                        ) : (
                          <span className="flex w-full items-center justify-center gap-1.5 rounded border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700">
                            <Icon icon="mdi:bookmark-outline" className="h-4 w-4" /> Save as Standby Alternate
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {deployed && (
                <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-3 text-sm font-bold text-emerald-800">
                  Convoy TRK-317 dispatched via {result?.recommendedId} corridor. ETA {routeOptions.find(r => r.id === result?.recommendedId)?.eta}. {result?.reason}
                </div>
              )}

              {/* Detail panel */}
              {selectedRoute && (
                <Panel title={`Route ${selectedRoute.id} — ${selectedRoute.label}`} icon="mdi:map-marker-path">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    {[
                      ["ETA", selectedRoute.eta],
                      ["Distance", selectedRoute.distance],
                      ["Fuel Cost", selectedRoute.fuel],
                      ["Risk Score", `${selectedRoute.risk}/100`],
                      ["Road Type", selectedRoute.road],
                    ].map(([label, value]) => (
                      <div key={label} className="flex flex-col rounded-lg bg-slate-50 p-3">
                        <div className="text-xs font-bold uppercase text-slate-500">{label}</div>
                        <div className="mt-1 font-bold leading-snug text-slate-900">{value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 grid gap-2 md:grid-cols-3">
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                      <div className="text-xs font-bold uppercase text-emerald-700">Advantages</div>
                      <p className="mt-1 text-sm leading-5 text-emerald-900">{selectedRoute.pros}</p>
                    </div>
                    <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                      <div className="text-xs font-bold uppercase text-red-700">Trade-offs</div>
                      <p className="mt-1 text-sm leading-5 text-red-900">{selectedRoute.cons}</p>
                    </div>
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                      <div className="text-xs font-bold uppercase text-blue-700">AI Verdict</div>
                      <p className="mt-1 text-sm leading-5 text-blue-900">{selectedRoute.verdict}</p>
                    </div>
                  </div>
                  {result && <p className="mt-3 text-sm leading-5 text-slate-600">{result.reason}</p>}
                </Panel>
              )}

              {/* Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded bg-slate-100 p-2"><Icon icon="mdi:shield-check" className="h-5 w-5 text-slate-600" /></div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">ULIP & NDMA Compliance Cryptographic Proof</div>
                    <div className="text-[10px] text-slate-500">SHA-256: 9b2d87e1f403c9ab812d4490ef432d011c7908ab9e3431865a3dcf23 | SIGNED BY DISPATCH CONTROLLER GHY-01</div>
                  </div>
                  <span className="rounded bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700">VERIFIED HASH</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-500">CHIEF DISPATCH AUTHORIZATION</div>
                    <div className="text-sm font-bold text-slate-900">OFFICER K. SHARMA (NER-OPS-09)</div>
                  </div>
                  <button className="rounded border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50">Print Waybill</button>
                  <button className="rounded bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-slate-800">Lock Dispatch Session</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </PageFrame>
  );
}
