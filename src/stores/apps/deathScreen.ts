import { create } from "zustand";

interface IDeathscreenStore {
  cooldownRespawn: string | undefined;
  timeToRespawn: string | undefined;

  setCooldownRespawn: (cooldown: string | undefined) => void;
  setTimeToRespawn: (time: string | undefined) => void;
}

export const useDeathscreenStore = create<IDeathscreenStore>((set) => ({
  cooldownRespawn: "05:00",
  timeToRespawn: "30:00",

  setCooldownRespawn: (cooldown: string | undefined) =>
    set({ cooldownRespawn: cooldown }),
  setTimeToRespawn: (time: string | undefined) => set({ timeToRespawn: time }),
}));
