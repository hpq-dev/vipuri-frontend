import { HandIcon } from "@/utils/icons/inventory";
import { useInventoryStore } from "@/stores/apps";
import { useDragDrop } from "../hooks";
import { useState } from "react";

export const DropToDeleteBox = () => {
  const { draggedItem, sourceInfo, handleDragEnd } = useDragDrop();
  const { dropItem } = useInventoryStore();
  const [isHovering, setIsHovering] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    if (draggedItem && sourceInfo) {
      dropItem(sourceInfo);
      handleDragEnd();
      setIsHovering(false);
    }
  };

  return (
    <div
      onDragEnter={(e) => {
        e.preventDefault();
        setIsHovering(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDragLeave={() => setIsHovering(false)}
      onDrop={handleDrop}
      className={`mt-[2vh] flex h-[12vh] w-[21vw] items-center justify-center rounded-[1vh] text-[0.9vw] font-bold italic transition-all duration-150`}
      style={{
        backgroundImage: isHovering
          ? "radial-gradient(circle, rgba(255, 99, 125, 0.5) 0.12vw, transparent 0.12vw)"
          : "radial-gradient(circle, rgba(255,255,255,0.1) 0.12vw, transparent 0.12vw)",
        backgroundSize: "1.5vw 2.5vh",
        backgroundColor: "transparent",
      }}
    >
      <div className="pointer-events-none flex flex-col items-center justify-center gap-[0.7vh]">
        <HandIcon className="w-[2.5vw] text-primary" />
        <h1 className="text-[0.7vw] font-bold uppercase text-primary">
          Drag here item to drop
        </h1>
      </div>
    </div>
  );
};
