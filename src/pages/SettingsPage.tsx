import PageFrame from "../components/PageFrame";
import Panel from "../components/Panel";
import Stat from "../components/Stat";

export default function SettingsPage() {
  return (
    <PageFrame title="Settings" subtitle="Prototype controls, roles, source labels, and environment-safe integrations.">
      <div className="grid gap-3 lg:grid-cols-2">
        <Panel title="Roles" icon="mdi:account">
          {["Control Center", "Field Officer", "Driver", "Emergency Operator", "Admin"].map((role) => <div key={role} className="mb-2 flex items-center justify-between rounded-lg bg-slate-50 p-2"><b>{role}</b><span className="text-xs font-bold text-slate-500">Demo access enabled</span></div>)}
        </Panel>
        <Panel title="Environment" icon="mdi:cog">
          <div className="space-y-2">
            <Stat label="Weather API" value="Open-Meteo supported through env, demo fallback active" />
            <Stat label="Gemini Assistant" value="Server-side API route ready, rule fallback active" />
            <Stat label="ULIP / VAHAN / FASTag" value="Not connected in prototype; simulated feed only" />
            <Stat label="Security" value="Role navigation, no client API secrets, sanitized demo inputs" />
          </div>
        </Panel>
      </div>
    </PageFrame>
  );
}
