import type { ReactNode } from "react";
import Panel from "./Panel";

export default function ChartPanel({ title, children }: { title: string; children: ReactNode }) {
  return <Panel title={title} icon="mdi:gauge"><div className="h-64">{children}</div></Panel>;
}
