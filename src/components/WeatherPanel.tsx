import { weather } from "../data/mockData";
import Panel from "./Panel";

export default function WeatherPanel() {
  return (
    <Panel title="Weather Risk" icon="mdi:weather-rainy">
      <div className="grid grid-cols-2 gap-2 text-sm">
        {Object.entries(weather).filter(([k]) => k !== "source").map(([label, value]) => (
          <div key={label} className="rounded-lg bg-slate-50 p-3">
            <div className="text-xs font-bold uppercase text-slate-500">{label.replace(/([A-Z])/g, " $1")}</div>
            <div className="mt-1 font-bold text-slate-900">{String(value)}</div>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-slate-500">Source status: {weather.source}. UI falls back automatically if an external API fails.</p>
    </Panel>
  );
}
