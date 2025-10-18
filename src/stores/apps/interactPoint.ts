import { create } from "zustand";

interface InteractPointState {
  key: string;
  description: string;
  active: boolean;
  setActive: (active: boolean) => void;
  setInteractPoint: (key: string, description: string) => void;
}

export const useInteractPointStore = create<InteractPointState>((set) => ({
  key: "F",
  description: "To interact",
  active: true,
  setActive: (active) => set({ active }),
  setInteractPoint: (key, description) => set({ key, description }),
}));
