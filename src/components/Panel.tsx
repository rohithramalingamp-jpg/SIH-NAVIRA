import type { ReactNode } from "react";
import Icon from "./Icon";

export default function Panel({ title, icon, children }: { title: string; icon?: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <div className="mb-2 flex items-center gap-3">
        {icon && <Icon icon={icon} className="h-5 w-5 text-[#0b5cad]" />}
        <h2 className="text-sm font-bold text-slate-900">{title}</h2>
      </div>
      {children}
    </section>
  );
}
