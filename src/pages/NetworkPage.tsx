import PageFrame from "../components/PageFrame";
import LogisticsMap from "../components/LogisticsMap";
import { corridors } from "../data/mockData";
import { calculateCorridorRisk } from "../services/riskEngine";
import clsx from "clsx";

export default function NetworkPage() {
  return (
    <PageFrame title="Network Intelligence" subtitle="Corridor health, road accessibility, incidents, facilities, and weather-risk overlays.">
      <div className="grid gap-3 xl:grid-cols-[1.2fr_.8fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm"><LogisticsMap demoRunning /></div>
        <div className="space-y-3">
          {corridors.slice(0, 8).map((corridor) => {
            const risk = calculateCorridorRisk(corridor);
            return (
              <div key={corridor.id} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-bold">{corridor.name}</div>
                    <div className="text-sm text-slate-500">{corridor.distanceKm} km | ETA {corridor.eta}</div>
                  </div>
                  <span className={clsx("rounded-full px-2 py-1 text-xs font-bold", risk.level === "HIGH" ? "bg-orange-100 text-orange-800" : "bg-emerald-100 text-emerald-800")}>{risk.score}/100</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageFrame>
  );
}
