import clsx from "clsx";

export default function RiskPill({ risk }: { risk: string }) {
  return (
    <span className={clsx("rounded-full px-2 py-1 text-xs font-bold", risk === "HIGH" || risk === "CRITICAL" ? "bg-red-100 text-red-800" : risk === "MODERATE" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800")}>
      {risk}
    </span>
  );
}
