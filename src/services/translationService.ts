export function translateDemo(input: string, language: string) {
  const normalized = input.toLowerCase();
  if (language === "Assamese" || normalized.includes("pani") || normalized.includes("flood")) {
    return {
      label: "AI-assisted translation - demo",
      summary: "Flooded road reported near convoy corridor.",
      incident: "Flooded road",
      severity: "HIGH",
      action: "Reroute medical convoy and request field verification.",
    };
  }
  return {
    label: "AI-assisted translation - demo",
    summary: "Road blocked due to fallen rocks. Two trucks are waiting.",
    incident: "Landslide / Rockfall",
    severity: "HIGH",
    action: "Reroute nearby vehicles and dispatch road clearance team.",
  };
}
