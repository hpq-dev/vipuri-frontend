import { create } from "zustand";

interface IFishshopState {
  page: "home" | "fishlist" | "store";

  allFishes: {
    id: string;
    name: string;
    price: number;
    image: string;
  }[];

  fishes: {
    id: number;
    name: string;
    price: number;
    image: string;
  }[];

  items: {
    id: string;
    name: string;
    price: number;
    image: string;
  }[];

  missions: {
    title: string;
    description: string;
    progress: number;
    money: number;
    status: "progress" | "completed";
  }[];

  selectedFishes: string[];

  setSelectedFishes: (fishes: IFishshopState["selectedFishes"]) => void;
  setPage: (page: IFishshopState["page"]) => void;
  setAllFishes: (fishes: IFishshopState["allFishes"]) => void;
  setFishes: (fishes: IFishshopState["fishes"]) => void;
  setItems: (items: IFishshopState["items"]) => void;
  setMissions: (missions: IFishshopState["missions"]) => void;
}

export const useFishshopStore = create<IFishshopState>()((set) => ({
  page: "fishlist",

  allFishes: Array.from({ length: 10 }, (_, index) => ({
    id: index.toString(),
    name: `Fish ${index + 1}`,
    price: index * 10,
    image: "",
  })),

  fishes: Array.from({ length: 10 }, (_, index) => ({
    id: index,
    name: `Fish ${index + 1}`,
    price: index * 10,
    image: "",
  })),

  items: Array.from({ length: 10 }, (_, index) => ({
    id: index.toString(),
    name: `Item ${index + 1}`,
    price: index * 10,
    image: "",
  })),

  missions: Array.from({ length: 10 }, (_, index) => ({
    title: `Mision ${index + 1}`,
    description: `Lorem Ipsum is simply dummy text of the`,
    progress: index * 20,
    money: 0,
    status: "progress",
  })),

  selectedFishes: [],

  setSelectedFishes: (selectedFishes) => set({ selectedFishes }),
  setPage: (page) => set({ page }),
  setAllFishes: (allFishes) => set({ allFishes }),
  setFishes: (fishes) => set({ fishes }),
  setItems: (items) => set({ items }),
  setMissions: (missions) => set({ missions }),
}));
