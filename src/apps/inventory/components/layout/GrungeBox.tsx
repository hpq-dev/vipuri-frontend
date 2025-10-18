import texture from "@/apps/inventory/assets/texture.png";
import { AnimatePresence, motion } from "framer-motion";
import { useInventoryStore } from "@/stores/apps";
import type { IInventorySlot } from "../../types";
import { useRef, useState } from "react";
import { useDragDrop } from "../../hooks";
import { ActionMenu } from "../ActionMenu";

interface ISlotProps {
  containerId: string;
  slotIndex: number;
  slot: IInventorySlot;
  className?: string;
  placeholderIcon?: React.ReactNode;
}

let isBottomActionMenu = false;

export const SlotComponent = ({
  containerId,
  slotIndex,
  slot,
  className,
  placeholderIcon,
}: ISlotProps) => {
  const { moveItem, dropItem } = useInventoryStore();
  const { sourceInfo, handleDragStart, handleDragEnd } = useDragDrop();

  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const isBeingDragged =
    sourceInfo?.containerId === containerId &&
    sourceInfo?.slotIndex === slotIndex;

  const slotRef = useRef<HTMLDivElement>(null);

  const GRID_COLUMNS: Record<string, number> = {
    player_inventory: 4,
    player_fast_slots: 5,
    player_crafting: 4,
    player_proximity: 4,
  };

  const columns = GRID_COLUMNS[containerId] || 4;
  const isLeftMostSlot =
    containerId === "player_inventory" && slotIndex % columns === 0;
  const isRightMostSlot =
    ["player_crafting", "player_proximity"].includes(containerId) &&
    (slotIndex + 1) % columns === 0;

  const handleUseItem = () => {
    if (!slot?.item) return;
  };

  const handleDropItem = (amount: number) => {
    dropItem({ containerId, slotIndex }, amount);
  };

  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!slot?.item || !slotRef.current) return;

    const rect = slotRef.current.getBoundingClientRect();
    const menuHeight = 230;
    const menuWidth = 200;
    let posX = 0;
    let posY = rect.height + 6;

    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    if (rect.bottom + menuHeight > viewportHeight) {
      isBottomActionMenu = true;
      posY = -menuHeight;
    } else isBottomActionMenu = false;

    if (rect.left + menuWidth > viewportWidth) {
      posX = rect.width - menuWidth;
    }

    setMenuPosition({ x: posX, y: posY });
    setShowMenu(true);
  };

  const onDragStart = (e: React.DragEvent) => {
    if (!slot?.item) return;
    e.dataTransfer.effectAllowed = "move";
    handleDragStart(slot.item, containerId, slotIndex);
  };

  const onDragOver = (e: React.DragEvent) => e.preventDefault();

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (sourceInfo) {
      moveItem(sourceInfo, { containerId, slotIndex });
      handleDragEnd();
    }
  };

  return (
    <div
      ref={slotRef}
      className={`relative flex cursor-pointer flex-col items-center justify-start rounded-[1vh] bg-dark-300 shadow-[0_0.2vh_0.1vw_0.05vh_rgba(0,0,0,0.2)] transition-all duration-200 ${className}`}
      draggable={!!slot?.item}
      onContextMenu={onContextMenu}
      onDragStart={onDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {slot?.item ? (
        <>
          <div
            className={`absolute h-full w-full rounded-[1vh] bg-[length:5vw_4.8vw] bg-center transition-opacity duration-200 ${
              isBeingDragged ? "opacity-20" : "opacity-50"
            }`}
            style={{ backgroundImage: `url(${texture})` }}
          />

          {containerId === "player_inventory" && (
            <>
              <div className="absolute left-[0.4vw] top-[0.4vh] z-10 text-[0.6vw] font-semibold italic text-light/30">
                {Math.round(slot.item.weight * slot.item.count * 10) / 10} KG
              </div>
              <div className="absolute right-[0.4vw] top-[0.4vh] z-10 rounded-[0.6vh] bg-dark-200 px-[0.35vw] py-[0.1vh] text-[0.55vw] font-semibold italic text-light/50 shadow-[0_0.2vh_0vw_0.1vh_rgba(0,0,0,0.1)]">
                {slot.item.count}x
              </div>
            </>
          )}

          <div className="pointer-events-none z-10 flex h-full w-full items-center justify-center">
            <img
              src={slot.item.image || "https://placehold.co/50"}
              alt={slot.item.name}
              className={`w-[2vw] object-contain transition-all duration-200 ${
                isBeingDragged ? "scale-90 opacity-30" : ""
              }`}
              draggable={false}
            />
          </div>
        </>
      ) : (
        placeholderIcon && (
          <div className="text-[2vw] opacity-30 transition-opacity duration-200">
            {placeholderIcon}
          </div>
        )
      )}

      <AnimatePresence>
        {showMenu && slot.item && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 z-50"
            style={{ top: menuPosition.y }}
          >
            <ActionMenu
              item={slot.item}
              position={{ x: 0, y: 0 }}
              onUse={handleUseItem}
              onDrop={handleDropItem}
              onGive={() => {}}
              onClose={() => setShowMenu(false)}
              isLeftMostSlot={isLeftMostSlot}
              isRightMostSlot={isRightMostSlot}
              isBottomActionMenu={isBottomActionMenu}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
