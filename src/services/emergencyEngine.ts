export function calculateEmergencyPriority(severity = 95, cargoCriticality = 92, connectivityLoss = 88, routeRisk = 84) {
  return Math.round(severity * 0.4 + cargoCriticality * 0.3 + connectivityLoss * 0.15 + routeRisk * 0.15);
}

export const responders = [
  { name: "Response Van 04", distance: "7.2 km away", eta: "24 min" },
  { name: "Truck 22", distance: "11.4 km away", eta: "38 min" },
  { name: "District Support Unit", distance: "18.3 km away", eta: "52 min" },
];
