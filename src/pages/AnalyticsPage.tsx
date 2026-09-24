import PageFrame from "../components/PageFrame";
import Panel from "../components/Panel";
import ChartPanel from "../components/ChartPanel";
import {
  Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

export default function AnalyticsPage() {
  const bars = [
    { name: "Route", value: 72 },
    { name: "Network", value: 81 },
    { name: "Emergency", value: 84 },
    { name: "Coverage", value: 69 },
  ];
  const trend = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => ({ day, delay: 44 - i * 3, success: 80 + i * 2, incidents: 11 + (i % 3) * 4 }));
  return (
    <PageFrame title="Analytics" subtitle="Simulated resilience metrics for delivery performance, delays, route risk, and emergency readiness.">
      <div className="grid gap-3 xl:grid-cols-[360px_1fr]">
        <Panel title="GRAMITRA Resilience Score" icon="mdi:gauge">
          <div className="text-center">
            <div className="text-6xl font-bold text-[#0b5cad]">78</div>
            <div className="font-bold text-slate-500">/ 100 demo metric</div>
          </div>
           <div className="mt-3 space-y-2">{bars.map((b) => <div key={b.name}><div className="mb-1 flex justify-between text-sm font-bold"><span>{b.name} Resilience</span><span>{b.value}</span></div><div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-[#0b5cad]" style={{ width: `${b.value}%` }} /></div></div>)}</div>
        </Panel>
         <div className="grid gap-3 lg:grid-cols-2">
          <ChartPanel title="Delivery Success Rate"><ResponsiveContainer><LineChart data={trend}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="day" /><YAxis /><Tooltip /><Line dataKey="success" stroke="#16a34a" strokeWidth={3} /></LineChart></ResponsiveContainer></ChartPanel>
          <ChartPanel title="Average Delay"><ResponsiveContainer><BarChart data={trend}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="day" /><YAxis /><Tooltip /><Bar dataKey="delay" fill="#f59e0b" /></BarChart></ResponsiveContainer></ChartPanel>
          <ChartPanel title="Risk Distribution"><ResponsiveContainer><PieChart><Pie data={[{ name: "Low", value: 44 }, { name: "Moderate", value: 31 }, { name: "High", value: 18 }, { name: "Critical", value: 7 }]} dataKey="value" nameKey="name">{["#16a34a", "#f59e0b", "#f97316", "#dc2626"].map((c) => <Cell key={c} fill={c} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></ChartPanel>
          <ChartPanel title="Incident Trend"><ResponsiveContainer><LineChart data={trend}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="day" /><YAxis /><Tooltip /><Line dataKey="incidents" stroke="#dc2626" strokeWidth={3} /></LineChart></ResponsiveContainer></ChartPanel>
        </div>
      </div>
    </PageFrame>
  );
}
