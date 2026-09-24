import { useState } from "react";
import PageFrame from "../components/PageFrame";
import Panel from "../components/Panel";
import Stat from "../components/Stat";
import EmptyState from "../components/EmptyState";
import Icon from "../components/Icon";
import { calculateEmergencyPriority, responders } from "../services/emergencyEngine";

export default function EmergencyPage() {
  const [active, setActive] = useState(false);
  const [dispatched, setDispatched] = useState(false);
  const [called, setCalled] = useState(false);
  const [viewRoute, setViewRoute] = useState(false);
  const score = calculateEmergencyPriority();
  return (
    <PageFrame title="AI Emergency Assistance" subtitle="Prioritize stranded vehicles carrying critical cargo and recommend response actions.">
      <div className="grid gap-3 xl:grid-cols-[420px_1fr]">
        <Panel title="Driver Emergency" icon="mdi:alert-circle">
          <button
            onClick={() => setActive(true)}
            className="group relative flex min-h-44 w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-b from-red-600 to-red-700 text-white shadow-2xl shadow-red-900/30 transition-all hover:from-red-700 hover:to-red-800 hover:shadow-red-900/40 active:scale-[0.97]"
          >
            <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-red-400/40" />
            <span className="grid h-20 w-20 place-items-center rounded-full bg-white/15 backdrop-blur-sm transition-transform group-hover:scale-110">
              <Icon icon="mdi:alert" className="h-11 w-11" />
            </span>
            <span className="text-3xl font-bold tracking-wider">NEED HELP</span>
            <span className="text-xs font-bold uppercase tracking-widest text-red-100/80">Tap to trigger emergency</span>
          </button>
          <p className="mt-4 text-sm leading-6 text-slate-600">Click to create a demo emergency case for TRK-317 with last-known GPS, critical cargo, responder matching, and safe route recommendation.</p>
          {active && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600" />
              </span>
              Emergency active — response in progress
            </div>
          )}
        </Panel>
        <Panel title="Emergency Assistance" icon="mdi:car-emergency">
          {active ? (
             <div className="grid gap-3 lg:grid-cols-[1fr_360px]">
               <div className="space-y-2">
                {[
                  ["Driver", "TRK-317"],
                  ["Location", "Last known GPS near Churachandpur corridor"],
                  ["Situation", "Vehicle stranded"],
                  ["Cargo", "Medical supplies"],
                  ["Severity", "CRITICAL"],
                  ["Response timer", "00:02:18"],
                  ["Priority Score", `${score}/100`],
                ].map(([label, value]) => <Stat key={label} label={label} value={value} />)}
                <div className="rounded-lg bg-blue-50 p-4 text-blue-900"><b>AI Recommendation:</b> Dispatch Response Van 04. Shortest safe approach route. Estimated arrival: 24 min.</div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setDispatched(true)} className="rounded-lg bg-[#0b5cad] px-4 py-2 text-sm font-bold text-white">Dispatch</button>
                  <button onClick={() => setCalled(true)} className="rounded-lg bg-[#0b5cad] px-4 py-2 text-sm font-bold text-white">Call Driver</button>
                  <button onClick={() => setViewRoute(true)} className="rounded-lg bg-[#0b5cad] px-4 py-2 text-sm font-bold text-white">View Safe Route</button>
                </div>
                {dispatched && <div className="mt-2 rounded-lg bg-emerald-50 p-3 text-sm font-bold text-emerald-800">Response Van 04 dispatched. ETA 24 min.</div>}
                {called && <div className="mt-2 rounded-lg bg-blue-50 p-3 text-sm font-bold text-blue-800">Calling TRK-317 driver...</div>}
                {viewRoute && <div className="mt-2 rounded-lg bg-amber-50 p-3 text-sm font-bold text-amber-800">Safe route via Route B loaded on map.</div>}
              </div>
              <div>
                <h3 className="mb-3 font-bold">Nearby Responders</h3>
                <div className="space-y-3">{responders.map((responder) => <div key={responder.name} className="rounded-lg border border-slate-200 p-3"><b>{responder.name}</b><div className="text-sm text-slate-500">{responder.distance} | ETA {responder.eta}</div></div>)}</div>
              </div>
            </div>
          ) : <EmptyState text="No active emergency selected. Use the driver button to trigger the demo workflow." />}
        </Panel>
      </div>
    </PageFrame>
  );
}
