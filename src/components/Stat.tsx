export default function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3">
      <div className="text-xs font-bold uppercase text-slate-500">{label.replace(/([A-Z])/g, " $1")}</div>
      <div className="mt-1 font-bold text-slate-900">{value}</div>
    </div>
  );
}
