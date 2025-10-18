import { useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/utils/icons/dealership";
import { ArrowsIcon } from "@/utils/icons/storekit";

interface RangeProps {
  title: string;
  initialValue: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export const Range = ({
  title,
  initialValue,
  min = 0,
  max = 100,
  onChange,
}: RangeProps) => {
  const [value, setValue] = useState(initialValue);
  const barRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (newVal: number) => {
    const clamped = Math.max(min, Math.min(max, newVal));
    setValue(clamped);
    onChange?.(clamped);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const percent = relX / rect.width;
    const newValue = Math.round(percent * max);
    handleChange(newValue);
  };

  const startDrag = () => {
    isDragging.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopDrag);
  };

  const stopDrag = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopDrag);
  };

  return (
    <div className="mx-auto my-[1vh] flex w-[20vw] items-center justify-between gap-[0.5vw]">
      <h1 className="w-full truncate text-left text-[.7vw] font-extrabold uppercase italic text-success">
        {title}
      </h1>

      <button
        onClick={() => handleChange(value - 1)}
        className="flex cursor-pointer items-center justify-center bg-primary/10 px-[.5vw] py-[0.3vh] transition hover:bg-primary/30"
      >
        <ArrowLeftIcon className="w-[1vw] text-primary" />
      </button>

      <div
        className="relative h-[1vh] w-full cursor-pointer overflow-visible bg-primary/10"
        onMouseDown={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const percent = (e.clientX - rect.left) / rect.width;
          const newValue = Math.round(percent * max);
          handleChange(newValue);
        }}
        ref={barRef}
      >
        <div
          className="h-full bg-primary"
          style={{ width: `${(value / max) * 100}%` }}
        />
        <div
          className="absolute top-1/2 flex h-[1.8vh] w-[1.5vw] -translate-y-1/2 items-center justify-center bg-white"
          style={{ left: `calc(${(value / max) * 100}% - 0.75vw)` }}
          onMouseDown={startDrag}
        >
          <ArrowsIcon className="w-[1.2vw] text-dark-400" />
        </div>
      </div>

      <button
        onClick={() => handleChange(value + 1)}
        className="flex cursor-pointer items-center justify-center bg-primary/10 px-[.5vw] py-[0.3vh] transition hover:bg-primary/30"
      >
        <ArrowRightIcon className="w-[1vw] text-primary" />
      </button>

      <h1 className="w-[2vw] select-none text-center font-mono text-[.9vw] font-extrabold italic text-white">
        {value}
      </h1>
    </div>
  );
};
