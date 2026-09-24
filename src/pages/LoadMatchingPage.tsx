import { useState } from "react";
import { motion } from "framer-motion";
import PageFrame from "../components/PageFrame";
import Panel from "../components/Panel";
import CargoCard from "../components/CargoCard";
import { scoreLoadMatch } from "../services/loadMatchingEngine";
import { cargoRequests, vehicles } from "../data/mockData";

export default function LoadMatchingPage() {
  const [matched, setMatched] = useState(false);
  const cargo = cargoRequests[0];
  const candidateVehicles = [vehicles[17], vehicles[26], vehicles[30]];
  return (
    <PageFrame title="Smart Load Sharing Network" subtitle="Match unused capacity with nearby cargo to reduce empty trips.">
      <div className="grid gap-3 xl:grid-cols-[.9fr_1.1fr]">
        <Panel title="Pending Cargo" icon="mdi:package-check">
          <CargoCard cargo={cargo} large />
          <div className="mt-2 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">Problem: nearby vehicles often return empty or carry unused capacity. GRAMITRA scores destination alignment, capacity, detour, and priority compatibility.</div>
        </Panel>
        <Panel title="Available Vehicles" icon="mdi:truck">
          <div className="space-y-2">
            {candidateVehicles.map((vehicle, index) => {
              const score = index === 0 ? { score: 94, reasons: ["Same destination", "Enough available capacity", "Low detour", "High priority compatibility"] } : scoreLoadMatch(cargo, vehicle);
              return (
                <div key={vehicle.id} className="rounded-lg border border-slate-200 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-lg font-bold">{vehicle.id}</div>
                      <div className="text-sm text-slate-500">Capacity {vehicle.capacityTons} tons | Available {vehicle.availableKg} kg | Distance {index === 0 ? "12" : index === 1 ? "24" : "8"} km</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold uppercase text-slate-500">AI Match Score</div>
                      <div className="text-3xl font-bold text-emerald-700">{score.score}%</div>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">{score.reasons.map((reason) => <span key={reason} className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">{reason}</span>)}</div>
                  {index === 0 && <button onClick={() => setMatched(true)} className="mt-2 rounded-lg bg-[#0b5cad] px-4 py-2 text-sm font-bold text-white">Match Load</button>}
                </div>
              );
            })}
          </div>
          {matched && (
            <motion.div initial={{ scale: .96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-2 rounded-lg bg-emerald-50 p-4 text-emerald-900">
              <div className="text-xl font-bold">Load Matched</div>
              <div className="mt-1 text-sm">Estimated empty trip reduction: 18 km | Estimated fuel saving: Rs 640. Demo values.</div>
            </motion.div>
          )}
        </Panel>
      </div>
    </PageFrame>
  );
}
