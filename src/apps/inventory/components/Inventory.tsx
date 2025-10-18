import {
  BackpackIcon,
  BraceletIcon,
  CapIcon,
  EarringsIcon,
  GlassesIcon,
  GlovesIcon,
  MaskIcon,
  PantsIcon,
  ShirtIcon,
  ShoesIcon,
  TShirtIcon,
  WatchIcon,
  SearchIcon,
} from "@/utils/icons/inventory";
import { SlotComponent } from "./layout/GrungeBox";
import { useInventoryStore } from "@/stores/apps";
import { useState, useMemo } from "react";
import type { IInventorySlot } from "../types";

interface IInventoryContainerProps {
  containerId: string;
}

const equipmentLayout = {
  head: [
    { icon: CapIcon, width: "w-[1.5vw]" },
    { icon: MaskIcon, width: "w-[1.5vw]" },
    { icon: GlassesIcon, width: "w-[2vw]" },
    { icon: EarringsIcon, width: "w-[1.5vw]" },
  ],
  leftSide: [
    { icon: BraceletIcon, width: "w-[1.5vw]" },
    { icon: WatchIcon, width: "w-[1.5vw]" },
    { icon: GlovesIcon, width: "w-[1.5vw]" },
    { icon: BackpackIcon, width: "w-[1.5vw]" },
  ],
  rightSide: [
    { icon: ShirtIcon, width: "w-[1.7vw]" },
    { icon: TShirtIcon, width: "w-[1.3vw]" },
    { icon: PantsIcon, width: "w-[1.2vw]" },
    { icon: ShoesIcon, width: "w-[1.7vw]" },
  ],
};

const EquipmentSlot = ({
  slot,
  icon: Icon,
  width,
  slotIndex,
  containerId,
}: {
  slot: IInventorySlot;
  icon: React.ComponentType<{ className?: string }>;
  width: string;
  slotIndex: number;
  containerId: string;
}) => (
  <SlotComponent
    containerId={containerId}
    slotIndex={slotIndex}
    slot={slot}
    className="flex h-[9vh] w-[4.5vw] items-center justify-center"
    placeholderIcon={
      !slot?.item && Icon ? (
        <Icon className={`${width} text-zinc-400`} />
      ) : undefined
    }
  />
);

export const InventoryContainer = ({
  containerId,
}: IInventoryContainerProps) => {
  const container = useInventoryStore((state) => state.containers[containerId]);
  const totalWeight = useInventoryStore((state) =>
    state.getContainerWeight(containerId)
  );
  const [searchTerm, setSearchTerm] = useState("");

  const isInventory = containerId === "player_inventory";
  const isEquipment = containerId === "player_equipment";
  const isCraftingResult = containerId === "player_crafting_result";
  const isFastSlots = containerId === "player_fast_slots";
  const isBackpack = containerId === "player_backpack";
  const isVehicleStorage = containerId === "player_vehicle_storage";

  const filteredSlots = useMemo(() => {
    if (!container) return [];
    if (!isInventory || !searchTerm.trim()) return container.slots;
    const q = searchTerm.trim().toLowerCase();
    return container.slots.map((slot) =>
      slot.item && slot.item.name.toLowerCase().includes(q)
        ? slot
        : { item: null }
    );
  }, [searchTerm, isInventory, container]);

  if (!container) return <div>Loading container {containerId}...</div>;

  const renderLayout = () => {
    if (isEquipment) {
      const getSlot = (index: number) => container.slots[index];

      return (
        <div className="-ml-[1vw] mb-[4vh] flex flex-col items-center justify-center gap-[7vh]">
          <div className="flex items-center justify-center gap-[.7vw]">
            {equipmentLayout.head.map((s, i) => (
              <EquipmentSlot
                key={i}
                slot={getSlot(i)}
                slotIndex={i}
                containerId={containerId}
                {...s}
              />
            ))}
          </div>
          <div className="flex items-center justify-center gap-[1.5vw]">
            <div className="flex flex-col items-center justify-center gap-[1vh]">
              {equipmentLayout.leftSide.map((s, i) => (
                <EquipmentSlot
                  key={i}
                  slot={getSlot(4 + i)}
                  slotIndex={4 + i}
                  containerId={containerId}
                  {...s}
                />
              ))}
            </div>
            <div className="w-[12vw]" />
            <div className="flex flex-col items-center justify-center gap-[1vh]">
              {equipmentLayout.rightSide.map((s, i) => (
                <EquipmentSlot
                  key={i}
                  slot={getSlot(8 + i)}
                  slotIndex={8 + i}
                  containerId={containerId}
                  {...s}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    const slots = isInventory ? filteredSlots : container.slots;

    return (
      <div
        className="grid gap-[0.4vw]"
        style={{
          gridTemplateColumns: isFastSlots
            ? "repeat(5, 5vw)"
            : "repeat(4, 5vw)",
        }}
      >
        {slots.map((slot, index) => (
          <div key={index}>
            <SlotComponent
              containerId={containerId}
              slotIndex={index}
              slot={slot}
              className="h-[10vh] w-full"
            />
            {isFastSlots && (
              <div className="absolute">
                <h1 className="relative top-[1vh] rounded-[.5vh] bg-dark-100 px-[0.35vw] py-[0.1vh] text-[.6vw] font-medium italic text-light">
                  {index + 1}
                </h1>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="mx-[2.5vw] flex w-fit flex-col items-start justify-center gap-[1vh]">
      {!isEquipment && (
        <div
          className="flex items-center justify-between gap-[0.7vw]"
          style={{ width: "calc(4 * 5vw + 3 * 0.4vw)" }}
        >
          {!isFastSlots && (
            <h1 className="flex-shrink-0 text-[1.1vw] font-extrabold italic text-primary">
              {container.label.toUpperCase()}
            </h1>
          )}
          {isInventory && (
            <div className="relative flex min-w-0 flex-1 items-center justify-start">
              <SearchIcon className="absolute z-10 ml-[0.4vw] w-[0.8vw] text-light/20" />
              <input
                type="text"
                placeholder="Cauta"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-[.9vh] bg-dark-300 py-[1vh] pl-[1.4vw] pr-[0.3vw] text-[0.7vw] font-semibold uppercase italic text-light/20 placeholder:font-bold placeholder:text-light/20"
              />
            </div>
          )}
          {(isInventory || isBackpack || isVehicleStorage) && (
            <h1 className="flex flex-shrink-0 items-center justify-center gap-[0.2vw] text-[1vw] font-extrabold">
              <span className="italic text-warning">
                {totalWeight.toFixed(2)}KG
              </span>
              <span className="italic text-light/20">/</span>
              <span className="italic text-light/20">
                {container.maxWeight}KG
              </span>
            </h1>
          )}
        </div>
      )}
      <div
        className="flex flex-col items-start gap-[1.5vh]"
        style={{ width: "calc(4 * 5vw + 3 * 0.4vw)" }}
      >
        <div className="w-fit">{renderLayout()}</div>
        {(isInventory || isCraftingResult) && (
          <p className="w-full text-[0.65vw] leading-tight text-light/20">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        )}
      </div>
    </div>
  );
};
