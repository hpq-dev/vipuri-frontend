import { create } from "zustand"; 

interface IGarageFilters {
  key: string;
  label: string;
}

interface IGarageBadge {
  name: string;
  type: "white" | "primary" | "secondary" | "danger";
}

export type IGarageVehicle  = any
interface IGarageStore {
  filters: IGarageFilters[];
  selectedFilter: string;
  vehicleOptions: string[];

  selectedVehicle: IGarageVehicle | null;
  vehicles: IGarageVehicle[];

  doorAnimation: boolean;
  garageMounted: boolean;

  setDoorAnimation: (open: boolean) => void;
  setGarageMounted: (mounted: boolean) => void;

  setSelectedVehicle: (id: number) => void;

  addVehicleToFavorite: (id: number) => void;
  removeVehicleFromFavorite: (id: number) => void;
  setSelectedFilter: (key: string) => void;
  setVehicles: (vehicles: IGarageVehicle[]) => void;
}

export const useGarageStore = create<IGarageStore>((set, get) => ({
  filters: [
    { key: "all", label: "All" },
    { key: "favorites", label: "Favorites" },
    { key: "inUse", label: "In Use" },
    { key: "spawned", label: "Spawned" },
  ],
  selectedFilter: "all",
  selectedVehicle: null,
  vehicleOptions: ["spawn", "park", "locate"],
  vehicles: [],

  doorAnimation: false,
  garageMounted: false,

  setDoorAnimation: (open) => {
    set({ doorAnimation: open });
  },

  setGarageMounted: (mounted) => {
    set({ garageMounted: mounted });
  },

  setSelectedVehicle: (id) => {
    const vehicles = get().vehicles;
    const selectedVehicle = vehicles.find((v) => v.id === id) || null;
    set({ selectedVehicle });
  },

  setSelectedFilter: (key) => {
    set({ selectedFilter: key });
  },

  setVehicles: (vehicles) => {
    vehicles = vehicles.map((vehicle) => ({
      ...vehicle,
      badges: vehicle.isFavorite ? [{ name: "Favorite", type: "primary" }] : [],
    }));

    set({ vehicles });
  },

  addVehicleToFavorite: (id) => {
    const vehicle = get().vehicles.find((v) => v.id === id);
    console.log(`Added vehicle ${vehicle?.model.name} to favorite`);
    if (vehicle) {
      set((state) => ({
        vehicles: state.vehicles.map((v) =>
          v.id === id ? { ...v, isFavorite: true } : v
        ),
      }));
    }
  },

  removeVehicleFromFavorite: (id) => {
    const vehicle = get().vehicles.find((v) => v.id === id);
    if (vehicle) {
      set((state) => ({
        vehicles: state.vehicles.map((v) =>
          v.id === id ? { ...v, isFavorite: false } : v
        ),
      }));
    }
  },
}));

export type GarageStore = ReturnType<typeof useGarageStore.getState>;
