import { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../components/Icon";
import PageFrame from "../components/PageFrame";
import Panel from "../components/Panel";
import Stat from "../components/Stat";
import EmptyState from "../components/EmptyState";
import { translateDemo } from "../services/translationService";
import { queueOfflineReport, getOfflineReports, syncReports } from "../services/offlineSyncService";

export default function FieldReportPage() {
  const [language, setLanguage] = useState("Assamese");
  const [text, setText] = useState("Road is blocked due to fallen rocks. Two trucks are waiting.");
  const [reports, setReports] = useState(getOfflineReports());
  const [synced, setSynced] = useState(false);
  const [recording, setRecording] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const fieldActions = [
    { label: "Report", Icon: "mdi:microphone" },
    { label: "Photo", Icon: "mdi:map-marker" },
    { label: "Location", Icon: "mdi:satellite" },
    { label: "Help", Icon: "mdi:alert-circle" },
    { label: "Sync", Icon: "mdi:cloud-upload" },
  ];
  const parsed = translateDemo(text, language);
  const submit = () => setReports([queueOfflineReport({ text, language }), ...getOfflineReports()]);
  const sync = () => {
    setReports(syncReports());
    setSynced(true);
    window.setTimeout(() => setSynced(false), 1800);
  };
  return (
    <PageFrame title="Voice + Offline Field Reporting" subtitle="Mobile-first field reporting for poor-connectivity corridors.">
      <div className="grid gap-5 xl:grid-cols-[420px_1fr]">
        <Panel title="Field Officer Console" icon="mdi:microphone">
          <div className="rounded-lg bg-[#0b1f35] p-3 text-white">
            <button onClick={() => setRecording(!recording)} className={`mx-auto grid h-24 w-24 place-items-center rounded-full shadow-2xl transition ${recording ? "bg-red-700 emergency-pulse" : "bg-red-600"}`}><Icon icon="mdi:microphone" className="h-12 w-12" /></button>
            <div className="mt-2 text-center text-lg font-bold">Report Road Condition</div>
            {recording && <div className="mt-1 text-center text-xs font-bold text-red-300">Recording... tap to stop</div>}
          </div>
        <div className="mt-2 grid grid-cols-5 gap-1.5 text-center text-xs font-bold">
 {fieldActions.map(({ label, Icon: iconName }) => (
                <button key={label} onClick={() => setActiveAction(label)} className={`grid min-h-16 place-items-center rounded-lg border p-1.5 transition ${activeAction === label ? "border-[#0b5cad] bg-[#0b5cad]/10 text-[#0b5cad]" : "border-slate-200 bg-slate-50"}`}><Icon icon={iconName} className="h-5 w-5" /> {label}</button>
              ))}
           </div>
           <div className="mt-2 grid grid-cols-4 gap-1.5 text-xs">
            {["Signal Weak", "Battery 74%", "GPS Locked", "Last Sync 32m"].map((item) => <div key={item} className="rounded-lg bg-slate-50 p-2 text-center font-bold">{item}</div>)}
          </div>
        </Panel>
        <Panel title="Offline Report Builder" icon="mdi:cloud-upload">
          <div className="grid gap-3 lg:grid-cols-2">
            <div>
              <label className="text-sm font-bold">Language</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="mt-1 h-11 w-full rounded-lg border border-slate-200 px-3">
                {["English", "Hindi", "Assamese", "Bengali", "Tamil", "Manipuri"].map((lang) => <option key={lang}>{lang}</option>)}
              </select>
              <label className="mt-4 block text-sm font-bold">Driver input</label>
              <textarea value={text} onChange={(e) => setText(e.target.value)} className="mt-1 min-h-24 w-full rounded-lg border border-slate-200 p-2" />
              <div className="mt-2 flex gap-2">
                <button onClick={submit} className="rounded-lg bg-[#0b5cad] px-4 py-2 text-sm font-bold text-white">Submit Offline</button>
                <button onClick={sync} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold">Sync Queue</button>
              </div>
            </div>
             <div className="rounded-lg bg-slate-50 p-3">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{parsed.label}</div>
               <div className="mt-2 space-y-1.5">
                <Stat label="Incident" value={parsed.incident} />
                <Stat label="Severity" value={parsed.severity} />
                <Stat label="Recommended Action" value={parsed.action} />
                <Stat label="Status" value="Pending Sync" />
              </div>
              <p className="mt-4 text-sm text-slate-600">Offline Mode: report securely stored on device and will sync automatically when connectivity returns.</p>
            </div>
          </div>
           <div className="mt-3 rounded-lg border border-slate-200 p-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">Offline Reports</h3>
              <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-bold text-amber-800">{reports.filter((r) => r.status === "Pending Sync").length} waiting</span>
            </div>
            <div className="mt-3 space-y-2">
              {reports.length === 0 ? <EmptyState text="No local reports yet. Submit one to test the offline queue." /> : reports.slice(0, 3).map((report) => <div key={report.id} className="rounded-lg bg-slate-50 p-3 text-sm"><b>{report.id}</b> | {report.language} | {report.status}</div>)}
            </div>
            {synced && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 rounded-lg bg-emerald-50 p-3 font-bold text-emerald-800">Sync Complete</motion.div>}
          </div>
        </Panel>
      </div>
    </PageFrame>
  );
}
