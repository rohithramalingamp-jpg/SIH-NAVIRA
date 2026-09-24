import type { Corridor, RiskLevel, RiskScore } from "../types";

const weights = {
  weatherRisk: 0.25,
  roadCondition: 0.25,
  terrainRisk: 0.2,
  incidentDensity: 0.15,
  trafficLoad: 0.1,
  historicalDelay: 0.05,
};

export function classifyRisk(score: number): RiskLevel {
  if (score >= 85) return "CRITICAL";
  if (score >= 65) return "HIGH";
  if (score >= 40) return "MODERATE";
  return "LOW";
}

export function calculateCorridorRisk(corridor: Corridor): RiskScore {
  const score = Math.round(
    corridor.weatherRisk * weights.weatherRisk +
      corridor.roadCondition * weights.roadCondition +
      corridor.terrainRisk * weights.terrainRisk +
      corridor.incidentDensity * weights.incidentDensity +
      corridor.trafficLoad * weights.trafficLoad +
      corridor.historicalDelay * weights.historicalDelay,
  );

  return {
    score,
    level: classifyRisk(score),
    contributors: {
      Rainfall: corridor.weatherRisk,
      "Road Condition": corridor.roadCondition,
      "Incident Density": corridor.incidentDensity,
      Traffic: corridor.trafficLoad,
      Terrain: corridor.terrainRisk,
      "Historical Delay": corridor.historicalDelay,
    },
    explanation:
      score >= 65
        ? "Rainfall intensity, terrain exposure, and recent incident density have increased disruption probability."
        : "Current corridor conditions are within acceptable demo thresholds, with human verification still recommended.",
  };
}

export const riskTimeline = [
  { time: "-6h", risk: 38, prediction: 40 },
  { time: "-4h", risk: 46, prediction: 48 },
  { time: "-2h", risk: 61, prediction: 64 },
  { time: "Now", risk: 82, prediction: 82 },
  { time: "+1h", risk: 0, prediction: 86 },
  { time: "+2h", risk: 0, prediction: 79 },
  { time: "+3h", risk: 0, prediction: 72 },
];
