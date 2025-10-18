import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { IInventoryItem } from "../types";
import { useDragDrop } from "../hooks";

interface IProps {
  item: IInventoryItem | null;
  position: { x: number; y: number };
  onUse: (amount: number) => void;
  onDrop: (amount: number) => void;
  onGive: (amount: number) => void;
  onClose: () => void;
  isLeftMostSlot?: boolean;
  isRightMostSlot?: boolean;
  isBottomActionMenu?: boolean;
}

export const ActionMenu: React.FC<IProps> = ({
  item,
  position,
  isLeftMostSlot,
  isRightMostSlot,
  isBottomActionMenu,
  onUse,
  onDrop,
  onGive,
  onClose,
}) => {
  const [amount, setAmount] = useState<string>("");
  const menuRef = useRef<HTMLDivElement>(null);
  const { setCloseMenuCallback } = useDragDrop();

  useEffect(() => {
    setCloseMenuCallback(() => onClose);
    return () => setCloseMenuCallback(null);
  }, [onClose, setCloseMenuCallback]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const parsedAmount = useMemo(() => parseInt(amount), [amount]);
  const validAmount = useMemo(
    () => parsedAmount > 0 && !isNaN(parsedAmount),
    [parsedAmount]
  );

  const handleDrop = useCallback(() => {
    if (!validAmount) return;
    onDrop(parsedAmount);
    onClose();
  }, [parsedAmount, validAmount, onDrop, onClose]);

  const handleUse = useCallback(() => {
    if (!validAmount) return;
    onUse(parsedAmount);
    onClose();
  }, [parsedAmount, validAmount, onUse, onClose]);

  const handleGive = useCallback(() => {
    if (!validAmount) return;
    onGive(parsedAmount);
    onClose();
  }, [parsedAmount, validAmount, onGive, onClose]);

  return (
    <div
      ref={menuRef}
      className={`absolute z-50 flex flex-col items-center justify-center gap-[0.7vh] rounded-[1vh] shadow-[0_0_1vh_0.1vw_rgba(0,0,0,0.3)] ${
        isLeftMostSlot || isRightMostSlot ? "w-[10vw]" : "w-[14vw]"
      }`}
      style={{
        left: position.x - (isLeftMostSlot ? 40 : isRightMostSlot ? 53 : 87),
        top: position.y,
      }}
      onMouseDown={handleMouseDown}
      onDragStart={handleDragStart}
      draggable={false}
    >
      {!isBottomActionMenu && (
        <div
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          className="absolute -top-[1.5vh] left-1/2 h-[1.7vh] w-[1.5vw] -translate-x-1/2 bg-dark-300"
        />
      )}
      <div className="flex w-full flex-col items-center justify-center gap-[0.7vh] rounded-[1vh] bg-dark-300 shadow-md">
        <div className="flex w-full items-start justify-between px-[1.3vw] py-[2.5vh]">
          <div className="flex flex-col items-start">
            <h1 className="text-[.7vw] font-semibold text-light">
              {item?.name}
            </h1>
            <h2 className="text-[.55vw] text-white/70">{item?.description}</h2>
          </div>
          <h1 className="text-[.8vw] font-bold text-warning">
            {item && item?.weight * item?.count}KG
          </h1>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-[0.3vh]">
          <input
            className="w-full rounded-t-[1vh] bg-dark-200 px-[0.7vw] py-[1vh] text-[.7vw] font-bold italic tracking-wide text-white/20 placeholder:text-white/20"
            placeholder="SCRIE CANTITATE"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onMouseDown={handleMouseDown}
          />
          <div className="flex w-full flex-col gap-[0.5vh]">
            <div className="flex w-full items-center justify-center gap-[0.2vw]">
              <button
                onClick={handleUse}
                onMouseDown={handleMouseDown}
                className="w-full truncate bg-dark-100 px-[0.8vw] py-[1.1vh] text-[.7vw] font-bold text-light disabled:opacity-40"
              >
                FOLOSESTE
              </button>
              <button
                onClick={handleDrop}
                onMouseDown={handleMouseDown}
                className="w-full bg-dark-100 px-[0.8vw] py-[1.1vh] text-[.7vw] font-bold text-light disabled:opacity-40"
              >
                ARUNCA
              </button>
            </div>
            <button
              disabled={!validAmount}
              onClick={handleGive}
              onMouseDown={handleMouseDown}
              className="w-full rounded-b-[1vh] bg-dark-100 px-[0.8vw] py-[1.1vh] text-[.7vw] font-bold text-light disabled:opacity-40"
            >
              OFERA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
