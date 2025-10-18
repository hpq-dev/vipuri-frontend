import { create } from "zustand";
import { isGameEnv } from "@/utils/helpers";


export type IVehicleModel = any
export interface IDealershipVehicle {
  model: IVehicleModel;
  metadata: any
}

interface IDealershipState {
  categoryTypes:  any
  selectedCategoryType: any
  vehicles: IDealershipVehicle[];
  vehicleColorIds: number[];

  selectedColorId: number;
  selectedVehicle: IDealershipVehicle | null;

  reset(): void;

  setSelectedCategoryType: (categoryType: any) => void;
  setSelectedColor: (colorId: number) => void;
  setCategoryTypes: (categoryTypes: any) => void;
  setVehicles: (vehicles: IDealershipVehicle[]) => void;
  setSelectedVehicle: (vehicle: IDealershipVehicle | null) => void;
}

export const useDealershipStore = create<IDealershipState>((set, get) => ({
  categoryTypes: [],
  selectedCategoryType: null,
  vehicles: [],
  vehicleColorIds: [39, 55, 42, 137, 36, 131, 149, 80],

  selectedColorId: 39,
  selectedVehicle: null,

  reset() {
    set({
      categoryTypes: [],
      selectedCategoryType: null,
      vehicles: [],
      vehicleColorIds: [39, 55, 42, 137, 36, 131, 149, 80],
      selectedColorId: 39,
      selectedVehicle: null,
    });
  },

  setSelectedCategoryType: (type: any) => {
    const { categoryTypes } = get(); 
  },

  setSelectedColor: (colorId: number) => {
    set({ selectedColorId: colorId });
  },

  setCategoryTypes: (categoryTypes: any) =>
    set({ categoryTypes }),

  setVehicles: (vehicles: IDealershipVehicle[]) => {
    const [selectedVehicle] = vehicles;
    set({ vehicles, selectedVehicle });
  },

  setSelectedVehicle: (vehicle: IDealershipVehicle | null) =>
    set({ selectedVehicle: vehicle }),
}));

if (isGameEnv()) {
  useDealershipStore.subscribe(async (state, prevState) => {
    // when category type changes
    if (
      state.selectedCategoryType !== prevState.selectedCategoryType &&
      state.selectedCategoryType !== null
    ) { 
    }

    // when selected vehicle changes
   

    // when category types changes
    if (state.categoryTypes.length !== prevState.categoryTypes.length) {
      const categoryType = state.categoryTypes[0] ?? null;
      if (!categoryType) return;
      state.setSelectedCategoryType(categoryType);
    }

    // when selected color changes
    if (state.selectedColorId !== prevState.selectedColorId) { 
    }
  });
}
