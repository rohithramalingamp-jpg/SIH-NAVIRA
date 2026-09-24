const KEY = "gramitra-offline-reports";

export interface OfflineReport {
  id: string;
  text: string;
  language: string;
  status: "Pending Sync" | "Synced";
  createdAt: string;
}

export function getOfflineReports(): OfflineReport[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as OfflineReport[];
  } catch {
    return [];
  }
}

export function queueOfflineReport(report: Omit<OfflineReport, "id" | "status" | "createdAt">) {
  const next: OfflineReport = {
    ...report,
    id: `REP-${Date.now()}`,
    status: "Pending Sync",
    createdAt: new Date().toLocaleTimeString(),
  };
  localStorage.setItem(KEY, JSON.stringify([next, ...getOfflineReports()].slice(0, 8)));
  return next;
}

export function syncReports() {
  const synced = getOfflineReports().map((report) => ({ ...report, status: "Synced" as const }));
  localStorage.setItem(KEY, JSON.stringify(synced));
  return synced;
}
