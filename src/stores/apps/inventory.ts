import { create } from "zustand";
import type {
  IInventoryContainer,
  IInventoryItem,
  IInventorySlot,
} from "@/apps/inventory/types"; 
import { useCommonStore } from "../common";
 
interface IInventoryState {
  backpackVisible: boolean;
  vehicleStorageVisible: boolean;
  containers: Record<string, IInventoryContainer>;
  loadItems: () => void;
  setBackpackVisible: (visible: boolean) => void;
  setVehicleStorageVisible: (visible: boolean) => void;
  getContainerWeight: (containerId: string) => number;
  initializeContainer: (container: Omit<IInventoryContainer, "slots">) => void;
  setContainerItems: (containerId: string, items: IInventoryItem[]) => void;
  addItem: (
    containerId: string,
    item: IInventoryItem,
    slotIndex: number
  ) => void;
  removeItem: (containerId: string, slotIndex: number) => void;
  removeItems: (
    containerId: string,
    predicate?: (item: IInventoryItem) => boolean
  ) => void;
  dropItem: (
    source: {
      containerId: string;
      slotIndex: number;
    },
    quantity?: number
  ) => Promise<void>;
  moveItem: (
    source: { containerId: string; slotIndex: number },
    target: { containerId: string; slotIndex: number }
  ) => Promise<void>;
  clearContainer: (containerId: string | "*") => void;
  getSlot: (
    containerId: string,
    slotIndex: number
  ) => IInventorySlot | undefined;
}

export const useInventoryStore = create<IInventoryState>((set, get) => ({
  backpackVisible: false,
  vehicleStorageVisible: false,
  containers: {},

  loadItems() {
    const { items } = useCommonStore.getState();
    const { addItem, removeItems } = get();

    removeItems("player_inventory");
    removeItems("player_equipment");
    removeItems("player_backpack");
    removeItems("player_fast_slots");
    removeItems("player_proximity");

    
  },

  setBackpackVisible: (visible) => set({ backpackVisible: visible }),
  setVehicleStorageVisible: (visible) =>
    set({ vehicleStorageVisible: visible }),

  initializeContainer: (container) => {
    set((state) => {
      const slots = Array.from({ length: container.maxSlots }, () => ({
        item: null,
      }));
      return {
        containers: {
          ...state.containers,
          [container.id]: { ...container, slots },
        },
      };
    });
  },

  clearContainer: (containerId) => {
    set((state) => {
      const newContainers = { ...state.containers };
      if (containerId === "*") {
        Object.keys(newContainers).forEach((id) => {
          newContainers[id] = {
            ...newContainers[id],
            slots: newContainers[id].slots.map(() => ({ item: null })),
          };
        });
      } else if (newContainers[containerId]) {
        newContainers[containerId] = {
          ...newContainers[containerId],
          slots: newContainers[containerId].slots.map(() => ({ item: null })),
        };
      }
      return { containers: newContainers };
    });
  },

  getContainerWeight: (containerId) => {
    const container = get().containers[containerId];
    if (!container) return 0;
    return container.slots.reduce((total, slot) => {
      if (!slot.item) return total;
      return total + slot.item.weight * slot.item.count;
    }, 0);
  },

  setContainerItems: (containerId, items) => {
    const container = get().containers[containerId];
    if (!container) return;
    const newSlots = Array.from({ length: container.maxSlots }, (_, i) => ({
      item: items.find((x) => x.slot === i) || null,
    }));
    set((state) => ({
      containers: {
        ...state.containers,
        [containerId]: { ...container, slots: newSlots },
      },
    }));
  },

  addItem: (containerId, item, slotIndex) => {
    const { containers } = get();
    const container = containers[containerId];
    if (!container) return false;

    const slots = [...container.slots];

    slots[slotIndex] = { item };

    set((state) => ({
      containers: {
        ...state.containers,
        [containerId]: { ...container, slots },
      },
    }));
  },

  removeItems: (
    containerId: string,
    predicate?: (item: IInventoryItem) => boolean
  ) => {
    const { containers } = get();
    const container = containers[containerId];
    if (!container) return;
    const newSlots = container.slots.map((slot) =>
      slot.item && (predicate ? predicate?.(slot.item) : true)
        ? { item: null }
        : slot
    );
    set((state) => ({
      containers: {
        ...state.containers,
        [containerId]: { ...container, slots: newSlots },
      },
    }));
  },

  removeItem: (containerId, slotIndex) => {
    const container = get().containers[containerId];
    if (!container || !container.slots[slotIndex]) return;
    const newSlots = [...container.slots];
    newSlots[slotIndex] = { item: null };
    set((state) => ({
      containers: {
        ...state.containers,
        [containerId]: { ...container, slots: newSlots },
      },
    }));
  },

  dropItem: async (source, quantity = 1) => {
    const { containers, loadItems } = get();
    const sourceContainer = containers[source.containerId];
    if (!sourceContainer) return;

    const sourceSlot = sourceContainer.slots[source.slotIndex];
    if (!sourceSlot?.item) return;
 

    loadItems();
  },

  moveItem: async (source, target) => {
    if (
      source.containerId === target.containerId &&
      source.slotIndex === target.slotIndex
    )
      return;

    const { containers, loadItems } = get();

    const sourceContainer = containers[source.containerId];
    const targetContainer = containers[target.containerId];
    if (!sourceContainer || !targetContainer) return;

    const sourceSlot = sourceContainer.slots[source.slotIndex];
    if (!sourceSlot?.item) return;

    const destinationType =
      targetContainer.type === "INVENTORY"
        ? "general"
        : targetContainer.type === "EQUIPMENT"
        ? "equip"
        : targetContainer.type === "FAST_SLOTS"
        ? "fast_slot"
        : targetContainer.type === "BACKPACK"
        ? "backpack"
        : null;

    if (!destinationType) return;

    if (sourceContainer.type === "PROXIMITY") { 
    } else { 
    }

    loadItems();
  },

  getSlot: (containerId, slotIndex) => {
    return get().containers[containerId]?.slots[slotIndex];
  },
}));
