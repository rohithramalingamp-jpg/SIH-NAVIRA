import Icon from "./Icon";
import { useGramitraStore } from "../store/useGramitraStore";
import type { Role } from "../types";

const roles: Role[] = ["Control Center", "Field Officer", "Driver"];
const roleIcons = ["mdi:view-dashboard", "mdi:microphone", "mdi:truck"];

export default function LoginPage() {
  const login = useGramitraStore((s) => s.login);
  return (
    <div className="min-h-screen bg-[#071525] text-white">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_.95fr]">
        <section className="relative flex flex-col justify-between overflow-hidden p-4 sm:p-6">
          <div className="absolute inset-0 opacity-50">
            <div className="absolute left-[8%] top-[12%] h-52 w-52 rounded-full bg-cyan-500 blur-[120px]" />
            <div className="absolute bottom-[10%] right-[12%] h-64 w-64 rounded-full bg-emerald-500 blur-[140px]" />
          </div>
          <div className="relative z-10"><Logo /></div>
          <div className="relative z-10 max-w-3xl py-6">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
              <Icon icon="mdi:shield-check" className="h-4 w-4" /> Live Demo Environment
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-normal sm:text-6xl">AI-powered resilient logistics intelligence for North Eastern Region.</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">GRAMITRA predicts logistics disruption before it becomes a supply crisis across mountain roads, extreme weather, low-connectivity field zones, and emergency corridors.</p>
          </div>
          <div className="relative z-10 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-3">
            {["Risk detected", "Route optimized", "Emergency prioritized"].map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-white/5 p-3">
                <Icon icon="mdi:shield-check" className="mb-3 h-5 w-5 text-emerald-300" />
                <div className="font-semibold">{item}</div>
              </div>
            ))}
          </div>
        </section>
        <section className="flex items-center bg-white p-4 text-slate-900 sm:p-6">
          <div className="w-full">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">Demo Access</p>
            <h2 className="mt-3 text-3xl font-bold">Choose an operational role</h2>
            <div className="mt-4 grid gap-3">
              {roles.map((roleName, index) => {
                const RoleIcon = roleIcons[index];
                return (
                  <button key={roleName} onClick={() => login(roleName)} className="group flex min-h-20 items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3 text-left transition hover:border-[#0b5cad] hover:bg-white hover:shadow-xl">
                    <div className="flex items-center gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-lg bg-[#0b1f35] text-white"><Icon icon={RoleIcon} className="h-6 w-6" /></div>
                      <div>
                        <div className="text-lg font-bold">{roleName}</div>
                        <div className="text-sm text-slate-500">Authenticated demo login. No real government system connected.</div>
                      </div>
                    </div>
                    <Icon icon="mdi:truck" className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1" />
                  </button>
                );
              })}
            </div>
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              Demo Data notice: feeds, AI scores, and integrations are simulated for hackathon evaluation unless configured by the team.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid h-11 w-11 place-items-center rounded-lg bg-[#0b1f35] text-white shadow-lg">
        <Icon icon="mdi:truck" className="h-6 w-6" />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-400" />
      </div>
      <div>
        <div className="text-lg font-bold tracking-[0.08em] text-white">GRAMITRA</div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Predict. Adapt. Deliver.</div>
      </div>
    </div>
  );
}
