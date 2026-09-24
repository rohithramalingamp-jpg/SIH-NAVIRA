import clsx from "clsx";

export default function LayerLegend() {
  return (
    <div className="flex flex-wrap gap-1.5 text-xs font-bold text-slate-600">
      {[["Safe", "bg-emerald-500"], ["Moderate", "bg-amber-500"], ["High Risk", "bg-orange-500"], ["Blocked", "bg-red-600"], ["Emergency", "bg-blue-600"]].map(([label, color]) => (
        <span key={label} className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1.5">
          <i className={clsx("h-2 w-2 rounded-full", color)} /> {label}
        </span>
      ))}
    </div>
  );
}
