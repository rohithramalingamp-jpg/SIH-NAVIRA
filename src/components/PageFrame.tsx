import type { ReactNode } from "react";

export default function PageFrame({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#0b5cad]/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0b5cad]">GRAMITRA</span>
        </div>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
