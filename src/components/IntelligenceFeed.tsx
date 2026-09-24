import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Panel from "./Panel";
import clsx from "clsx";

export default function IntelligenceFeed({ demoRunning }: { demoRunning: boolean }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setTick((v) => v + 1), 4500);
    return () => window.clearInterval(timer);
  }, []);

  const feed = [
    ["HIGH RISK", "Heavy rainfall detected in corridor", "Potential landslide disruption. 3 vehicles affected. Route recalculation recommended.", "text-orange-700 bg-orange-50"],
    ["DELAY PREDICTION", "Vehicle TRK-208 likely to arrive 38 min late", "Alternative route available for medical supplies.", "text-amber-700 bg-amber-50"],
    ["SAFE CORRIDOR", "Route B accessibility stable", "Suitable for priority medical shipment.", "text-emerald-700 bg-emerald-50"],
  ];
  const ordered = demoRunning ? feed.slice(tick % 3).concat(feed.slice(0, tick % 3)) : feed;

  return (
    <Panel title="AI Intelligence Feed" icon="mdi:alert">
      <div className="space-y-2">
        {ordered.map(([label, title, body, tone]) => (
          <motion.div key={title} className={clsx("rounded-lg p-3", tone)}>
            <div className="text-xs font-bold uppercase tracking-[0.16em]">{label}</div>
            <div className="mt-1 font-bold text-slate-900">{title}</div>
            <p className="mt-1 text-sm leading-5 text-slate-600">{body}</p>
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}
