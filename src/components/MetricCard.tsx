import { motion } from "framer-motion";
import Icon from "./Icon";
import clsx from "clsx";

export default function MetricCard({ label, value, trend, note, iconName }: { label: string; value: string; trend: string; note: string; iconName?: string }) {
  return (
    <motion.div layout className="group rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="rounded-lg bg-[#0b5cad]/10 p-2">
          <Icon icon={iconName || ""} className="h-5 w-5 text-[#0b5cad]" />
        </div>
        <span className={clsx("rounded-full px-2.5 py-1 text-xs font-bold", trend.startsWith("+") ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700")}>{trend}</span>
      </div>
      <div className="mt-3 text-2xl font-bold tracking-tight text-slate-900">{value}</div>
      <div className="mt-1 text-sm font-bold text-slate-700">{label}</div>
      <p className="mt-2 text-xs leading-5 text-slate-500">{note}</p>
    </motion.div>
  );
}
