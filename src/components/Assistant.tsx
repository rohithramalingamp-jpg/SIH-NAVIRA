import Icon from "./Icon";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("Which routes are at risk?");
  const answer = useMemo(() => {
    if (question.toLowerCase().includes("trk-317")) return "TRK-317 is delayed because the last sync is 32 minutes old, connectivity is offline, and its corridor risk is high. Prioritize emergency assistance.";
    if (question.toLowerCase().includes("capacity")) return "Vehicle TRK-118 has the best unused-capacity match: 800 kg available, same destination corridor, and 94% match score.";
    if (question.toLowerCase().includes("emergency")) return "The stranded medical-supply case is the highest priority. Dispatch Response Van 04 and keep the route under human verification.";
    return "Corridor COR-03 is the top route to watch. Rainfall, terrain exposure, and incident density are pushing risk above the high threshold.";
  }, [question]);
  return (
    <div className="fixed bottom-4 right-4 z-40">
      {open && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.2 }} className="mb-2 w-[min(92vw,380px)] rounded-xl border border-slate-200 bg-white p-3 shadow-2xl">
          <div className="mb-2 flex items-center gap-2 font-bold text-[#0b1f35]"><Icon icon="mdi:brain" className="h-5 w-5 text-[#0b5cad]" /> Ask GRAMITRA</div>
          <select value={question} onChange={(e) => setQuestion(e.target.value)} className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#0b5cad] focus:ring-1 focus:ring-[#0b5cad]/20">
            {["Which routes are at risk?", "Why is TRK-317 delayed?", "Where is unused vehicle capacity?", "Which emergency requires immediate action?"].map((q) => <option key={q}>{q}</option>)}
          </select>
          <div className="mt-2 rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-700">{answer}</div>
          <p className="mt-2 text-xs text-slate-400">Rule-based fallback active. Gemini should be used only through a secure server-side route when configured.</p>
        </motion.div>
      )}
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2.5 rounded-full bg-[#0b1f35] px-4 py-2 font-bold text-white shadow-2xl transition hover:bg-[#1a2f4d]">
        <Icon icon="mdi:send" className="h-5 w-5" /> Ask GRAMITRA
      </button>
    </div>
  );
}
