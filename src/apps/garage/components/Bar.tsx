import type React from "react";

export const Bar: React.FC<{ value: number }> = ({ value }) => {
  return (
    <div className="relative h-[1vh] w-[7vw] overflow-visible bg-[#2c2c2c]">
      <div className="h-full bg-white" style={{ width: `${value}%` }} />
      <div
        className="absolute top-1/2 h-[1.7vh] w-[1.5vw] -translate-y-1/2 bg-white"
        style={{
          left: `calc(${value}% - ${value > 50 ? 1 : 0}vw)`,
        }}
      />
    </div>
  );
};
