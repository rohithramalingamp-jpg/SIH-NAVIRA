import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { calculateCorridorRisk, riskTimeline } from "../services/riskEngine";
import Panel from "./Panel";

export default function RiskEnginePanel({ risk }: { risk: ReturnType<typeof calculateCorridorRisk> }) {
  return (
    <Panel title="AI Risk Intelligence Engine" icon="mdi:brain">
      <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
        <div className="grid h-24 w-24 place-items-center rounded-full border-[8px] border-orange-400 bg-orange-50 text-center">
          <div>
            <div className="text-3xl font-bold">{risk.score}</div>
            <div className="text-xs font-bold">{risk.level}</div>
          </div>
        </div>
        <div>
          <p className="font-semibold text-slate-900">High probability of accessibility disruption within the next 90 minutes.</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{risk.explanation}</p>
            <div className="mt-2 rounded-lg bg-slate-50 p-2 text-xs text-slate-600">
            Formula: weather 25% + road 25% + terrain 20% + incident density 15% + traffic 10% + historical delay 5%.
          </div>
        </div>
      </div>
      <div className="mt-3 space-y-1.5">
        {Object.entries(risk.contributors).slice(0, 5).map(([label, value]) => (
          <div key={label}>
            <div className="mb-1 flex justify-between text-xs font-bold text-slate-600"><span>{label}</span><span>{value}</span></div>
            <div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-[#0b5cad]" style={{ width: `${value}%` }} /></div>
          </div>
        ))}
      </div>
      <div className="mt-3 h-48">
        <ResponsiveContainer>
          <LineChart data={riskTimeline}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="time" tick={{ fontSize: 11 }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
            <Tooltip />
            <Line type="monotone" dataKey="risk" stroke="#0b5cad" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="prediction" stroke="#f97316" strokeWidth={3} strokeDasharray="5 5" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}
