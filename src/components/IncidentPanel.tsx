import { useState } from "react";
import { incidents } from "../data/mockData";
import Panel from "./Panel";

export default function IncidentPanel() {
  const [actions, setActions] = useState<Record<string, string>>({});
  return (
    <Panel title="Incident Management" icon="mdi:alert">
      <div className="grid gap-3 sm:grid-cols-2">
        {incidents.slice(0, 4).map((incident) => (
          <div key={incident.id} className="flex flex-col rounded-lg border border-slate-200 bg-slate-50 p-3 card-hover">
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-slate-900">{incident.id}</span>
              <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-700">{incident.status}</span>
            </div>
            <div className="mt-2 text-sm font-bold text-slate-900">{incident.type}</div>
            <div className="text-xs text-slate-500">{incident.location} | {incident.time}</div>
            <p className="mt-2 text-sm text-slate-600">{incident.recommendation}</p>
            <div className="mt-auto pt-2 flex flex-wrap gap-1.5">
              {["Assign", "Acknowledge", "Resolve"].map((action) => <button key={action} onClick={() => setActions(prev => ({ ...prev, [incident.id + action]: action }))} className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">{actions[incident.id + action] ? "✓ " + action : action}</button>)}
            </div>
            {Object.keys(actions).some(k => k.startsWith(incident.id)) && (
              <div className="mt-2 rounded bg-emerald-50 p-2 text-xs font-bold text-emerald-700">
                Last action: {Object.entries(actions).filter(([k]) => k.startsWith(incident.id)).pop()?.[1]}
              </div>
            )}
          </div>
        ))}
      </div>
    </Panel>
  );
}
