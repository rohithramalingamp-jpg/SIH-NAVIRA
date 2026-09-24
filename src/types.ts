export type Role = "Control Center" | "Field Officer" | "Driver" | "Emergency Operator" | "Admin";

export type VehicleStatus = "On schedule" | "Delayed" | "Critical" | "Emergency support";
export type Connectivity = "Online" | "Weak Signal" | "Offline";
export type RiskLevel = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface Vehicle {
  id: string;
  driver: string;
  cargo: string;
  category: "Mini Truck" | "4x4" | "Heavy Truck" | "Ambulance" | "Relief Vehicle";
  currentLocation: string;
  position: GeoPoint;
  eta: string;
  risk: RiskLevel;
  connectivity: Connectivity;
  status: VehicleStatus;
  capacityTons: number;
  availableKg: number;
  destination: string;
  lastSync: string;
}

export interface Corridor {
  id: string;
  name: string;
  from: string;
  to: string;
  path: GeoPoint[];
  distanceKm: number;
  eta: string;
  weatherRisk: number;
  roadCondition: number;
  terrainRisk: number;
  incidentDensity: number;
  trafficLoad: number;
  historicalDelay: number;
  status: "Safe" | "Moderate" | "High Risk" | "Blocked";
}

export interface Incident {
  id: string;
  location: string;
  position: GeoPoint;
  type: string;
  severity: RiskLevel;
  time: string;
  affectedRoutes: string[];
  affectedVehicles: string[];
  recommendation: string;
  status: "Detected" | "Verified" | "Action Required" | "Resolved";
}

export interface CargoRequest {
  id: string;
  category: "Medicines" | "Food" | "Agricultural produce" | "Construction materials" | "Emergency equipment";
  weightKg: number;
  destination: string;
  priority: "Low" | "Normal" | "High" | "Critical";
}

export interface Facility {
  id: string;
  name: string;
  type: "Supply Hub" | "Hospital" | "District Control";
  position: GeoPoint;
}

export interface RiskScore {
  score: number;
  level: RiskLevel;
  contributors: Record<string, number>;
  explanation: string;
}
