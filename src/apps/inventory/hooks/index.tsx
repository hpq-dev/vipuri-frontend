import { createContext, useContext, useState } from "react";
import type { IInventoryItem } from "../types";

interface DragSourceInfo {
  containerId: string;
  slotIndex: number;
}

interface IDragDropContext {
  draggedItem: IInventoryItem | null;
  sourceInfo: DragSourceInfo | null;
  handleDragStart: (
    item: IInventoryItem,
    sourceContainerId: string,
    sourceSlotIndex: number
  ) => void;
  handleDragEnd: () => void;
  setCloseMenuCallback: (callback: (() => void) | null) => void;
}

const DragDropContext = createContext<IDragDropContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useDragDrop = () => {
  const context = useContext(DragDropContext);
  if (!context)
    throw new Error("useDragDrop must be used within DragDropProvider");
  return context;
};

export const DragDropProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [draggedItem, setDraggedItem] = useState<IInventoryItem | null>(null);
  const [sourceInfo, setSourceInfo] = useState<DragSourceInfo | null>(null);
  const [closeMenuCallback, setCloseMenuCallback] = useState<
    (() => void) | null
  >(null);

  const handleDragStart = (
    item: IInventoryItem,
    sourceContainerId: string,
    sourceSlotIndex: number
  ) => {
    if (closeMenuCallback) closeMenuCallback();
    setDraggedItem(item);
    setSourceInfo({
      containerId: sourceContainerId,
      slotIndex: sourceSlotIndex,
    });
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setSourceInfo(null);
  };

  return (
    <DragDropContext.Provider
      value={{
        draggedItem,
        sourceInfo,
        handleDragStart,
        handleDragEnd,
        setCloseMenuCallback,
      }}
    >
      {children}
    </DragDropContext.Provider>
  );
};
