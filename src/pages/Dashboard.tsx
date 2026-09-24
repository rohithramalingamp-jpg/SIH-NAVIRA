import { useEffect } from "react";
import { calculateCorridorRisk } from "../services/riskEngine";
import LogisticsMap from "../components/LogisticsMap";
import MetricCard from "../components/MetricCard";
import RiskEnginePanel from "../components/RiskEnginePanel";
import IntelligenceFeed from "../components/IntelligenceFeed";
import WeatherPanel from "../components/WeatherPanel";
import IncidentPanel from "../components/IncidentPanel";
import ResponsibleAIPanel from "../components/ResponsibleAIPanel";
import DemoTimeline from "../components/DemoTimeline";
import { useGramitraStore } from "../store/useGramitraStore";

export default function Dashboard() {
  const { demoRunning, demoStep, nextDemoStep } = useGramitraStore();
  const selected: any = { weatherRisk: demoRunning ? 88 : 54, incidentDensity: demoRunning ? 76 : 38, roadCondition: 73, terrainRisk: 79, trafficLoad: 45, historicalDelay: 30 };
  const risk = calculateCorridorRisk(selected);

  useEffect(() => {
    if (!demoRunning) return;
    const timer = window.setInterval(nextDemoStep, 8500);
    return () => window.clearInterval(timer);
  }, [demoRunning, nextDemoStep]);

  const kpis = [
    ["Active Vehicles", "42", "+8%", "6 vehicles in weak signal areas", "mdi:truck"],
    ["Deliveries In Transit", "128", "+12%", "Priority supplies across 8 states", "mdi:package-check"],
    ["At-Risk Corridors", demoRunning ? "9" : "7", "+2", "Rainfall and terrain risk rising", "mdi:alert"],
    ["High Priority Supplies", "19", "-4%", "Medicines and emergency equipment", "mdi:package-variant-closed"],
    ["Route Delays Prevented", "31", "+6", "Demo simulation from optimized routes", "mdi:compass"],
    ["Emergency Requests", demoRunning ? "4" : "3", "+1", "Critical cases awaiting dispatch", "mdi:phone-alert"],
  ] as const;

  return (
    <div className="space-y-3">
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-[#0b1f35] p-3 text-white shadow-xl">
        <div className="grid gap-4 xl:grid-cols-[1fr_420px]">
          <div className="flex flex-col justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">System Online</span>
              <span className="text-sm text-slate-300">Last data sync: 2 minutes ago</span>
              <span className="text-sm text-slate-300">Source: Demo Data + Simulated Feed</span>
            </div>
            <div>
              <h1 className="mt-3 text-2xl font-bold tracking-normal sm:text-5xl">GRAMITRA Command Center</h1>
              <p className="mt-2 max-w-xl text-slate-300">North Eastern Region Logistics Intelligence for resilient emergency supply movement.</p>
            </div>
          </div>
          <DemoTimeline step={demoStep} active={demoRunning} />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        {kpis.map(([label, value, trend, note, iconName]) => (
          <MetricCard key={label} label={label} value={value} trend={trend} note={note} iconName={iconName} />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
        <div className="min-h-[500px] overflow-hidden rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-1">
            <div>
              <h2 className="text-xl font-bold">Live NER GIS Logistics Network</h2>
              <p className="text-sm text-slate-500">OpenStreetMap base layer with simulated vehicles, hubs, hospitals, incidents, and risk corridors.</p>
            </div>
          </div>
          <LogisticsMap demoRunning={demoRunning} />
        </div>
        <div className="space-y-2">
          <RiskEnginePanel risk={risk} />
          <IntelligenceFeed demoRunning={demoRunning} />
          <WeatherPanel />
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[.9fr_1.1fr]">
        <IncidentPanel />
        <ResponsibleAIPanel />
      </section>
    </div>
  );
}
