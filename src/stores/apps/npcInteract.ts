import { create } from "zustand";

interface OptionProps {
  identifier: string;
  label: string;
  variant?: "primary" | "secondary" | "dark";
}

interface INpcInteractStore {
  options: OptionProps[];
  name: string;
  title: string;
  description: string;

  setOptions: (options: OptionProps[]) => void;
  setName: (name: string) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
}

export const useNpcInteractStore = create<INpcInteractStore>((set) => ({
  options: [],
  name: "",
  title: "",
  description: "",

  setOptions: (options: OptionProps[]) => set({ options }),
  setName: (name: string) => set({ name }),
  setTitle: (title: string) => set({ title }),
  setDescription: (description: string) => set({ description }),
}));
