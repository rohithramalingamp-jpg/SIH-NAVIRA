import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "./components/Icon";
import { useGramitraStore } from "./store/useGramitraStore";
import LoginPage from "./components/LoginPage";
import Sidebar from "./components/Sidebar";
import Assistant from "./components/Assistant";
import Dashboard from "./pages/Dashboard";
import NetworkPage from "./pages/NetworkPage";
import RoutesPage from "./pages/RoutesPage";
import LoadMatchingPage from "./pages/LoadMatchingPage";
import VehiclesPage from "./pages/VehiclesPage";
import FieldReportPage from "./pages/FieldReportPage";
import EmergencyPage from "./pages/EmergencyPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  const { role, currentPage, demoRunning, notifications, startDemo, resetDemo, logout } = useGramitraStore();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => undefined);
  }, []);

  if (!role || currentPage === "/login") return <LoginPage />;

  return (
    <div className="min-h-screen bg-[#eef3f6] text-slate-900">
      <Sidebar />
      <main className="min-h-screen lg:pl-72">
        <Topbar notifications={notifications} demoRunning={demoRunning} onStartDemo={startDemo} onResetDemo={resetDemo} onMenu={() => setMobileMenu(v => !v)} onBell={() => setShowNotifs(v => !v)} showNotifs={showNotifs} role={role} onLogout={logout} />
        <div className="mx-auto max-w-[1720px] px-4 pb-8 pt-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
            >
              {renderPage(currentPage)}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      {mobileMenu && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileMenu(false)}>
          <div className="absolute inset-y-0 left-0 w-72 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <Sidebar mobile onNavigate={() => setMobileMenu(false)} />
          </div>
        </div>
      )}
      <Assistant />
    </div>
  );
}

function renderPage(page: string) {
  switch (page) {
    case "/network": return <NetworkPage />;
    case "/routes": return <RoutesPage />;
    case "/vehicles": return <VehiclesPage />;
    case "/load-matching": return <LoadMatchingPage />;
    case "/field-report": return <FieldReportPage />;
    case "/emergency": return <EmergencyPage />;
    case "/analytics": return <AnalyticsPage />;
    case "/settings": return <SettingsPage />;
    default: return <Dashboard />;
  }
}

function Topbar({ notifications, demoRunning, onStartDemo, onResetDemo, onMenu, onBell, showNotifs, role, onLogout }: { notifications: number; demoRunning: boolean; onStartDemo: () => void; onResetDemo: () => void; onMenu: () => void; onBell: () => void; showNotifs: boolean; role: string | null; onLogout: () => void }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:px-8">
      <div className="mx-auto flex max-w-[1720px] items-center gap-3">
        <button onClick={onMenu} className="rounded-lg border border-slate-200 p-2 lg:hidden"><Icon icon="mdi:view-dashboard" className="h-5 w-5" /></button>
        <div className="relative hidden flex-1 md:block">
          <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 outline-none focus:border-[#0b5cad]" placeholder="Search vehicle, corridor, incident..." />
        </div>
        <div className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 sm:flex">
          <Icon icon="mdi:radio" className="h-4 w-4 text-emerald-600" /> LIVE DEMO
        </div>
        <div className="relative">
          <button onClick={onBell} className="relative rounded-lg border border-slate-200 bg-white p-2">
            <Icon icon="mdi:bell" className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-red-600 text-[10px] font-bold text-white">{notifications}</span>
          </button>
          {showNotifs && (
            <div className="absolute right-0 top-full mt-2 w-72 rounded-lg border border-slate-200 bg-white p-3 shadow-xl">
              <div className="mb-2 text-xs font-bold uppercase text-slate-500">Notifications</div>
              {["Route COR-03 risk increased", "TRK-208 delay predicted", "New incident INC-4401"].map((n) => (
                <div key={n} className="rounded bg-slate-50 p-2 text-sm">{n}</div>
              ))}
            </div>
          )}
        </div>
        <button onClick={demoRunning ? onResetDemo : onStartDemo} className="rounded-lg bg-[#0b5cad] px-4 py-2 text-sm font-bold text-white shadow-lg shadow-blue-900/20">
          {demoRunning ? "Reset Demo" : "Run Live Demo"}
        </button>
        <button onClick={onStartDemo} className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-900">Judge Mode</button>
        <div className="hidden items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-bold text-slate-700 lg:flex">
          <Icon icon="mdi:account" className="h-4 w-4" /> {role}
        </div>
        <button onClick={onLogout} title="Switch role" className="rounded-lg border border-slate-300 bg-white p-2 text-slate-600 hover:bg-slate-50">
          <Icon icon="mdi:logout" className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
