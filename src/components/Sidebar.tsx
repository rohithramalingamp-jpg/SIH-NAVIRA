import Icon from "./Icon";
import { useGramitraStore } from "../store/useGramitraStore";
import clsx from "clsx";

const navItems = [
  ["/dashboard", "Overview", "mdi:view-dashboard"],
  ["/network", "Network Intelligence", "mdi:satellite"],
  ["/routes", "Route Optimizer", "mdi:routes"],
  ["/vehicles", "Vehicle Tracking", "mdi:truck"],
  ["/load-matching", "Smart Load Sharing", "mdi:package-variant-closed"],
  ["/field-report", "Field Reports", "mdi:microphone"],
  ["/emergency", "Emergency Response", "mdi:ambulance"],
  ["/analytics", "Analytics", "mdi:gauge"],
  ["/settings", "Settings", "mdi:cog"],
] as const;

export default function Sidebar({ mobile, onNavigate }: { mobile?: boolean; onNavigate?: () => void } = {}) {
  const { currentPage, navigate, role, logout } = useGramitraStore();
  const roleInitials: Record<string, string> = { "Control Center": "CC", "Field Officer": "FO", "Driver": "DR" };
  const roleSub: Record<string, string> = { "Control Center": "NER Operations", "Field Officer": "Ground Reporting", "Driver": "Fleet Unit" };
  const activeRole = role ?? "Control Center";
  return (
    <aside className={`${mobile ? "flex" : "fixed inset-y-0 left-0 z-30 hidden lg:flex"} w-72 flex-col border-r border-slate-200 bg-white px-3 py-3`}>
      <div className="mb-4">
        <Logo />
      </div>
      <nav className="mt-2 flex-1 space-y-1">
        {navItems.map(([path, label, iconName]) => (
          <button
            key={path}
            onClick={() => { navigate(path); onNavigate?.(); }}
            className={clsx(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition",
              currentPage === path ? "bg-[#0b5cad]/10 text-[#0b5cad]" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
            )}
          >
            <Icon icon={iconName} className="h-4 w-4 flex-shrink-0" /> {label}
          </button>
        ))}
      </nav>
      <div className="space-y-2 border-t border-slate-200 pt-2">
        <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2.5 text-xs font-semibold text-emerald-900">
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Connected</span>
          <span className="text-emerald-700">Sync 2m</span>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-[#0b5cad] text-white text-xs font-bold">{roleInitials[activeRole]}</div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold text-slate-900">{activeRole}</div>
            <div className="text-xs text-slate-500">{roleSub[activeRole]}</div>
          </div>
          <button onClick={() => { logout(); onNavigate?.(); }} title="Switch role" className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700">
            <Icon icon="mdi:logout" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid h-10 w-10 place-items-center rounded-lg bg-[#0b1f35] text-white shadow-lg">
        <Icon icon="mdi:routes" className="h-5 w-5" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-400" />
      </div>
      <div>
        <div className="text-lg font-bold tracking-[0.08em] text-slate-950">GRAMITRA</div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">Predict. Adapt. Deliver.</div>
      </div>
    </div>
  );
}
