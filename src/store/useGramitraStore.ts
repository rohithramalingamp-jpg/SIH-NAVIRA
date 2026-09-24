import { create } from "zustand";
import type { Role } from "../types";

interface DemoState {
  role: Role | null;
  currentPage: string;
  demoRunning: boolean;
  demoStep: number;
  notifications: number;
  setNotifications: (v: number) => void;
  login: (role: Role) => void;
  logout: () => void;
  navigate: (page: string) => void;
  startDemo: () => void;
  resetDemo: () => void;
  nextDemoStep: () => void;
}

export const demoSteps = ["Predict", "Detect", "Reroute", "Match", "Respond", "Recover"];

export const useGramitraStore = create<DemoState>((set) => ({
  role: null,
  currentPage: "/login",
  demoRunning: false,
  demoStep: 0,
  notifications: 3,
  setNotifications: (v) => set({ notifications: v }),
  login: (role) => set({
    role,
    currentPage: role === "Field Officer" ? "/field-report" : role === "Driver" ? "/vehicles" : "/dashboard",
    demoRunning: false,
    demoStep: 0,
    notifications: 3,
  }),
  logout: () => set({ role: null, currentPage: "/login", demoRunning: false, demoStep: 0, notifications: 3 }),
  navigate: (page) => set({ currentPage: page }),
  startDemo: () => set({ demoRunning: true, demoStep: 0, currentPage: "/dashboard", notifications: 6 }),
  resetDemo: () => set({ demoRunning: false, demoStep: 0, notifications: 3 }),
  nextDemoStep: () => set((state) => ({ demoStep: Math.min(state.demoStep + 1, demoSteps.length - 1) })),
}));
