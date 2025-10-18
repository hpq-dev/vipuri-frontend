import { create } from "zustand";

interface DialogState {
  variant: "confirm" | "input";
  title: string;
  message: string;
  inputValue?: string | null;

  setVariant: (variant: "confirm" | "input") => void;
  setTitle: (title: string) => void;
  setMessage: (message: string) => void;
  setInputValue?: (value: string | null) => void;
}

export const dialogStore = create<DialogState>((set) => ({
  variant: "input",
  title: "Accept/Refuz",
  message: "Un jucator doreste sa te jefuiasca/sa acceseze portbagajul.",
  inputValue: null,

  setVariant: (variant) => set({ variant }),
  setTitle: (title) => set({ title }),
  setInputValue: (value) => set({ inputValue: value }),
  setMessage: (message) => set({ message }),
}));
