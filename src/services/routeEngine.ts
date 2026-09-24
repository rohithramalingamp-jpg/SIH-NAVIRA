export const origins = ["Guwahati Hub", "Silchar Depot", "Imphal Hub"];
export const destinations = ["Remote Medical Center", "Aizawl Relief Center", "Kohima District Hospital"];
export const cargoTypes = ["Emergency Medicines", "Food Supplies", "Construction Material"];
export const priorities = ["Critical", "High", "Normal"];
export const vehicleTypes = ["4x4 Truck", "Heavy Truck", "Ambulance"];

export const routeOptions = [
  { id: "A", label: "Fastest", eta: "4h 10m", risk: 78, distance: "241 km", fuel: "₹4,200", road: "NH-37 highway", note: "Blocked probability HIGH — landslide zone active", recommended: false, color: "#ef4444", pros: "Shortest travel time among all options", cons: "Crosses 2 active landslide zones — high delay risk", verdict: "Only use if weather is clear and corridors are confirmed open." },
  { id: "B", label: "AI Recommended", eta: "4h 45m", risk: 29, distance: "268 km", fuel: "₹4,500", road: "NH-37 + SH-12", note: "Safe corridor — lowest disruption risk", recommended: true, color: "#16a34a", pros: "Lowest disruption risk, avoids all active incidents, fully paved for 85% of stretch", cons: "35 minutes slower than Route A, slightly higher fuel cost", verdict: "Best balance of speed and safety. Recommended for critical cargo." },
  { id: "C", label: "Fuel Efficient", eta: "5h 05m", risk: 42, distance: "252 km", fuel: "₹3,800", road: "SH-12 alternate", note: "Moderate weather exposure", recommended: false, color: "#f59e0b", pros: "Lowest fuel cost (₹700 less than Route B), moderate distance", cons: "Moderate weather exposure on 40% of stretch", verdict: "Good for non-critical cargo when fuel budget matters." },
  { id: "D", label: "Shortest", eta: "4h 30m", risk: 61, distance: "228 km", fuel: "₹4,100", road: "Old hill road", note: "Narrow mountain passes — high blockage risk", recommended: false, color: "#f97316", pros: "Shortest distance (228 km), 15 minutes faster than Route B", cons: "Narrow hill passes prone to blockage, 3 hairpin sections", verdict: "Risky during monsoon. Use only in dry conditions." },
  { id: "E", label: "All-Weather", eta: "5h 40m", risk: 15, distance: "295 km", fuel: "₹5,200", road: "NH-37 + valley bypass", note: "Paved entire stretch — safe in heavy rain", recommended: false, color: "#0b5cad", pros: "Lowest risk score (15/100), fully paved valley bypass, flood-safe", cons: "Longest route (295 km), highest fuel cost (₹5,200), 55 min slower than Route B", verdict: "Use during severe weather alerts or when other routes are blocked." },
];

export interface ShipmentInputs {
  origin: string;
  destination: string;
  cargo: string;
  priority: string;
  vehicle: string;
}

export function optimizeRoute(inputs: ShipmentInputs) {
  const baseBefore = "6h 10m";
  const cargoNote = inputs.cargo === "Emergency Medicines"
    ? "Cold-chain integrity maintained on paved corridors."
    : inputs.cargo === "Food Supplies"
    ? "Perishable window favors mid-speed balanced routes."
    : "Heavy cargo prefers stable road surface over speed.";

  let after = "4h 45m";
  let riskReduced = "64%";
  let reason = "";

  if (inputs.priority === "Critical") {
    after = "4h 45m";
    riskReduced = "64%";
    reason = `Critical priority: Route B chosen to minimize disruption risk (reduced ${riskReduced}). ${cargoNote} Avoids 2 active landslide zones on the Guwahati–Imphal corridor.`;
  } else if (inputs.priority === "High") {
    after = "4h 30m";
    riskReduced = "48%";
    reason = `High priority: Route D shortcut accepted at moderate risk. ${cargoNote} Saves 15 min over Route B but narrows through 3 hill passes.`;
  } else {
    after = "5h 05m";
    riskReduced = "35%";
    reason = `Normal priority: Route C fuel-efficient path selected. ${cargoNote} Costs ₹700 less than Route B with acceptable risk for non-urgent cargo.`;
  }

  if (inputs.cargo === "Construction Material") {
    reason += " Heavy cargo requires stable road surface — low-clearance bypasses excluded.";
  }

  if (inputs.vehicle === "Ambulance") {
    after = "4h 10m";
    riskReduced = "70%";
    reason = ` Ambulance priority override: fastest safe corridor with emergency lane access enabled.`;
  }

  const recommendedId = inputs.priority === "Critical" || inputs.vehicle === "Ambulance"
    ? "B"
    : inputs.priority === "High"
    ? "D"
    : "C";

  const before = inputs.origin === "Silchar Depot" ? "4h 20m" : inputs.origin === "Imphal Hub" ? "3h 05m" : baseBefore;

  return {
    before,
    after,
    delayAvoided: `${before} → ${after}`,
    riskReduced,
    recommendedId,
    reason,
  };
}
