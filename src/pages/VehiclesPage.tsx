import { useState } from "react";
import PageFrame from "../components/PageFrame";
import Panel from "../components/Panel";
import RiskPill from "../components/RiskPill";
import { vehicles } from "../data/mockData";
import { useGramitraStore } from "../store/useGramitraStore";
import type { Vehicle } from "../types";

export default function VehiclesPage() {
  const [selected, setSelected] = useState<Vehicle>(vehicles[16]);
  const navigate = useGramitraStore((s) => s.navigate);
  return (
    <PageFrame title="Vehicle Tracking" subtitle="Fleet telemetry, cargo status, route risk, and connectivity health.">
      <div className="grid gap-3 xl:grid-cols-[1fr_420px]">
        <Panel title="Fleet" icon="mdi:truck">
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>{["Vehicle", "Driver", "Cargo", "Location", "ETA", "Risk", "Connectivity", "Status"].map((h) => <th key={h} className="p-2">{h}</th>)}</tr>
              </thead>
              <tbody>
                {vehicles.slice(0, 18).map((vehicle) => (
                  <tr key={vehicle.id} onClick={() => setSelected(vehicle)} className="cursor-pointer border-t border-slate-100 hover:bg-slate-50">
                    <td className="p-2 font-bold">{vehicle.id}</td>
                    <td className="p-2">{vehicle.driver}</td>
                    <td className="p-2">{vehicle.cargo}</td>
                    <td className="p-2">{vehicle.currentLocation}</td>
                    <td className="p-2">{vehicle.eta}</td>
                    <td className="p-2"><RiskPill risk={vehicle.risk} /></td>
                    <td className="p-2">{vehicle.connectivity}</td>
                    <td className="p-2">{vehicle.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
        <Panel title={selected.id} icon="mdi:truck">
          <div className="h-48 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400 text-sm">Map View</div>
          <div className="mt-2 space-y-2 text-sm">
            {[
              ["Driver", selected.driver],
              ["Cargo", selected.cargo],
              ["Last sync", selected.lastSync],
              ["Current risk", selected.risk],
              ["Connectivity", selected.connectivity],
            ].map(([label, value]) => <div key={label} className="flex justify-between border-b border-slate-100 pb-2"><span className="text-slate-500">{label}</span><b>{value}</b></div>)}
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button onClick={() => navigate("/emergency")} className="rounded-lg bg-red-600 px-3 py-2 text-sm font-bold text-white transition hover:bg-red-700">Emergency</button>
            <button onClick={() => alert(`Contacting ${selected.driver}...`)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold transition hover:bg-slate-50">Contact</button>
          </div>
        </Panel>
      </div>
    </PageFrame>
  );
}
