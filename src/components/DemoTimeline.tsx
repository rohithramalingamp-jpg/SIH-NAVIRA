import { demoSteps } from "../store/useGramitraStore";
import clsx from "clsx";

export default function DemoTimeline({ step, active }: { step: number; active: boolean }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-bold uppercase tracking-[0.18em] text-white">Medical Supply Convoy</span>
        <span className={clsx("rounded-full px-2.5 py-1 text-xs font-bold", active ? "bg-emerald-400 text-emerald-950" : "bg-white/10 text-slate-300")}>{active ? "Running" : "Ready"}</span>
      </div>
      <div className="grid grid-cols-6 gap-2">
        {demoSteps.map((label, index) => (
          <div key={label} className="text-center">
            <div className={clsx("mx-auto h-2 rounded-full", index <= step && active ? "bg-cyan-300" : "bg-white/15")} />
            <div className="mt-2 text-[10px] font-bold uppercase tracking-wide text-slate-300">{label}</div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">
        {active ? "Step " + Math.min(step + 1, demoSteps.length) + ": " + demoSteps[Math.min(step, demoSteps.length - 1)] : "Click Run Live Demo or Judge Mode to start the 60-90 second scenario."}
      </p>
    </div>
  );
}
