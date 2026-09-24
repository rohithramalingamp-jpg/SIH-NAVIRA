import Icon from "./Icon";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative grid h-9 w-9 place-items-center rounded-lg bg-[#0b1f35] text-white shadow-lg">
        <Icon icon="mdi:routes" className="h-6 w-6" />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-400" />
      </div>
      <div>
        <div className="text-lg font-bold tracking-[0.08em] text-slate-950">GRAMITRA</div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Predict. Adapt. Deliver.</div>
      </div>
    </div>
  );
}
