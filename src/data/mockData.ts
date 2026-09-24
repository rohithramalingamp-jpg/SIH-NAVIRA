import type { CargoRequest, Corridor, Facility, Incident, Vehicle } from "../types";

const routeNames = [
  ["Guwahati Hub", "Shillong Ridge", "Meghalaya medical corridor"],
  ["Silchar Depot", "Aizawl Gate", "Mizoram relief corridor"],
  ["Dimapur Yard", "Kohima Ridge", "Nagaland hill supply route"],
  ["Imphal Hub", "Churachandpur Clinic", "Manipur emergency route"],
  ["Agartala Hub", "Kailashahar", "Tripura food corridor"],
  ["Tezpur Depot", "Itanagar Medical Center", "Arunachal mountain route"],
  ["Jorhat Hub", "Mokokchung", "Upper Assam-Nagaland link"],
  ["Gangtok Control", "Mangan", "Sikkim north access road"],
];

export const corridors: Corridor[] = Array.from({ length: 25 }, (_, index) => {
  const seed = routeNames[index % routeNames.length];
  const baseLat = 24.2 + (index % 8) * 0.55;
  const baseLng = 91.0 + (index % 7) * 0.6;
  const weatherRisk = [32, 54, 82, 68, 27][index % 5];
  const status = weatherRisk > 78 ? "High Risk" : weatherRisk > 60 ? "Moderate" : index % 11 === 0 ? "Blocked" : "Safe";
  return {
    id: `COR-${String(index + 1).padStart(2, "0")}`,
    name: `${seed[0]} -> ${seed[1]}`,
    from: seed[0],
    to: index === 2 ? "Remote Medical Center" : seed[1],
    path: [
      { lat: baseLat, lng: baseLng },
      { lat: baseLat + 0.25, lng: baseLng + 0.35 },
      { lat: baseLat + 0.58, lng: baseLng + 0.75 },
    ],
    distanceKm: 82 + index * 7,
    eta: `${3 + (index % 4)}h ${10 + (index * 7) % 45}m`,
    weatherRisk,
    roadCondition: 45 + ((index * 11) % 48),
    terrainRisk: 52 + ((index * 17) % 43),
    incidentDensity: 22 + ((index * 13) % 68),
    trafficLoad: 28 + ((index * 9) % 55),
    historicalDelay: 30 + ((index * 5) % 48),
    status,
  };
});

const cargoTypes = ["Medicines", "Food Supplies", "Agricultural Produce", "Construction Material", "Emergency Kits"];
const towns = ["Guwahati", "Shillong", "Aizawl", "Kohima", "Imphal", "Agartala", "Itanagar", "Gangtok", "Silchar", "Dibrugarh"];

export const vehicles: Vehicle[] = Array.from({ length: 42 }, (_, index) => {
  const critical = index === 16 || index % 13 === 0;
  const delayed = index % 5 === 0;
  const emergency = index % 17 === 0;
  const status = emergency ? "Emergency support" : critical ? "Critical" : delayed ? "Delayed" : "On schedule";
  return {
    id: `TRK-${String(101 + index)}`,
    driver: ["R. Das", "M. Sangma", "T. Jamir", "L. Zote", "N. Lepcha"][index % 5],
    cargo: cargoTypes[index % cargoTypes.length],
    category: ["Mini Truck", "4x4", "Heavy Truck", "Ambulance", "Relief Vehicle"][index % 5] as Vehicle["category"],
    currentLocation: `${towns[index % towns.length]} sector ${1 + (index % 4)}`,
    position: { lat: 24.0 + (index % 10) * 0.45, lng: 91.1 + (index % 9) * 0.48 },
    eta: critical ? "ETA delayed" : `${30 + (index * 8) % 80} min`,
    risk: critical ? "HIGH" : delayed ? "MODERATE" : "LOW",
    connectivity: critical ? "Offline" : delayed ? "Weak Signal" : "Online",
    status,
    capacityTons: [1.5, 2, 3, 5, 8][index % 5],
    availableKg: [250, 800, 1500, 500, 1100][index % 5],
    destination: index % 3 === 0 ? "Remote District" : towns[(index + 3) % towns.length],
    lastSync: critical ? "32 min ago" : `${2 + (index % 12)} min ago`,
  };
});

export const incidents: Incident[] = Array.from({ length: 30 }, (_, index) => ({
  id: `INC-${String(4400 + index)}`,
  location: `${towns[index % towns.length]} corridor ${index + 1}`,
  position: { lat: 24.25 + (index % 8) * 0.52, lng: 91.25 + (index % 7) * 0.58 },
  type: ["Heavy Rainfall", "Landslide / Rockfall", "Flooded Road", "Bridge Damage", "Road Surface Failure"][index % 5],
  severity: ["LOW", "MODERATE", "HIGH", "CRITICAL"][index % 4] as Incident["severity"],
  time: `${8 + (index % 10)}:${String((index * 7) % 60).padStart(2, "0")}`,
  affectedRoutes: [`COR-${String((index % 25) + 1).padStart(2, "0")}`],
  affectedVehicles: [`TRK-${String(101 + (index % 42))}`],
  recommendation: index % 3 === 0 ? "Reroute priority cargo via Route B" : "Verify condition with field officer",
  status: ["Detected", "Verified", "Action Required", "Resolved"][index % 4] as Incident["status"],
}));

export const cargoRequests: CargoRequest[] = Array.from({ length: 20 }, (_, index) => ({
  id: `CRG-${String(700 + index)}`,
  category: ["Medicines", "Food", "Agricultural produce", "Construction materials", "Emergency equipment"][index % 5] as CargoRequest["category"],
  weightKg: [1200, 850, 2200, 1700, 430][index % 5],
  destination: index % 4 === 0 ? "Remote District" : towns[(index + 2) % towns.length],
  priority: ["Critical", "High", "Normal", "Low"][index % 4] as CargoRequest["priority"],
}));

export const facilities: Facility[] = [
  ...Array.from({ length: 15 }, (_, i) => ({ id: `HUB-${i + 1}`, name: `${towns[i % towns.length]} Supply Hub`, type: "Supply Hub" as const, position: { lat: 24.1 + (i % 8) * 0.5, lng: 91 + (i % 7) * 0.55 } })),
  ...Array.from({ length: 10 }, (_, i) => ({ id: `HSP-${i + 1}`, name: `${towns[(i + 2) % towns.length]} District Hospital`, type: "Hospital" as const, position: { lat: 24.35 + (i % 6) * 0.6, lng: 91.35 + (i % 8) * 0.45 } })),
  ...Array.from({ length: 8 }, (_, i) => ({ id: `DCC-${i + 1}`, name: `${towns[(i + 4) % towns.length]} Control Center`, type: "District Control" as const, position: { lat: 24.6 + (i % 5) * 0.55, lng: 91.6 + (i % 6) * 0.5 } })),
];

export const weather = {
  rainfall: "82 mm / 24h",
  temperature: "21 C",
  visibility: "2.4 km",
  wind: "18 km/h",
  floodRisk: 68,
  landslideRisk: 82,
  source: "Demo Data, Open-Meteo fallback ready",
};
