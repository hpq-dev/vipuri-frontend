export type TInventoryContainerType =
  | "INVENTORY"
  | "EQUIPMENT"
  | "CRAFTING"
  | "CRAFTING_RESULT"
  | "PROXIMITY"
  | "FAST_SLOTS"
  | "BACKPACK"
  | "VEHICLE_STORAGE";

export interface IInventoryItem {
  id: number;
  name: string;
  description: string;
  weight: number;
  count: number;
  maxStack?: number;
  isStackable: boolean;
  image?: string;
  slot?: number;
  containerId?: string;
}

export interface IInventorySlot {
  item: IInventoryItem | null;
}

export interface IInventoryContainer {
  id: string;
  label: string;
  type: TInventoryContainerType;
  maxSlots: number;
  maxWeight: number;
  slots: IInventorySlot[];
}

export interface IServerInventoryItem extends IInventoryItem {
  slot: number;
  containerId: string;
}

export type TInventoryPage = "CRAFTING" | "PROXIMITY";
