import Panel from "./Panel";

export default function ResponsibleAIPanel() {
  return (
    <Panel title="AI Transparency" icon="mdi:shield-check">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Prediction confidence", "82%", "Decision support only"],
          ["Data timestamp", "2 min ago", "Simulated feed"],
          ["Source status", "Demo Data", "No live government claim"],
          ["Human verification", "Required", "Officials decide"],
        ].map(([label, value, note]) => (
          <div key={label} className="rounded-lg bg-slate-50 p-3 card-hover">
            <div className="text-xs font-bold uppercase text-slate-500">{label}</div>
            <div className="mt-2 text-xl font-bold text-slate-900">{value}</div>
            <div className="mt-1 text-xs text-slate-500">{note}</div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">GRAMITRA AI provides decision support. Final operational decisions remain with authorized officials, especially when predictions are generated from simulated or partial data.</p>
    </Panel>
  );
}
