import clsx from "clsx";
import type { CargoRequest } from "../types";

export default function CargoCard({ cargo, large }: { cargo: CargoRequest; large?: boolean }) {
  return (
    <div className={clsx("rounded-lg border border-slate-200 bg-slate-50 p-4", large && "min-h-44")}>
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{cargo.category}</div>
      <div className="mt-2 text-3xl font-bold">{(cargo.weightKg / 1000).toFixed(1)} tons</div>
      <div className="mt-2 text-sm text-slate-600">Destination: {cargo.destination}</div>
      <div className="mt-1 text-sm text-slate-600">Priority: {cargo.priority}</div>
    </div>
  );
}
