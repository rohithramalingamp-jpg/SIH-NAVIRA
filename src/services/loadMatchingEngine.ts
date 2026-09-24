import type { CargoRequest, Vehicle } from "../types";

export function scoreLoadMatch(cargo: CargoRequest, vehicle: Vehicle) {
  const destinationSimilarity = cargo.destination === vehicle.destination ? 94 : cargo.destination.includes(vehicle.destination) ? 72 : 54;
  const capacityFit = Math.min(100, Math.round((vehicle.availableKg / cargo.weightKg) * 100));
  const distanceScore = vehicle.id === "TRK-118" ? 92 : 70 - (Number(vehicle.id.slice(-1)) * 4);
  const priorityCompatibility = cargo.priority === "Critical" && vehicle.category !== "Heavy Truck" ? 90 : 76;
  const score = Math.round(destinationSimilarity * 0.35 + capacityFit * 0.25 + distanceScore * 0.2 + priorityCompatibility * 0.2);
  return {
    score,
    reasons: ["Same destination or compatible corridor", "Enough available capacity", "Low detour", "High priority compatibility"],
  };
}
