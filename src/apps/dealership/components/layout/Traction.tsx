import { useDealershipStore } from "@/stores/apps";
import type React from "react";

interface ITractionProps {
  className?: string;
}

export const Traction: React.FC<ITractionProps> = ({ className }) => {
  const dealershipStore = useDealershipStore();

  const traction = dealershipStore.selectedVehicle?.model.tractionType;

  return (
    <svg
      className={className}
      viewBox="0 0 82 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="9"
        y="24"
        width="64"
        height="7"
        fill="#D9D9D9"
        fillOpacity="0.15"
      />
      <rect
        x="9"
        y="13"
        width="6"
        height="9"
        fill={
          traction === "4x4" || traction === "front" ? "#D9D9D9" : "#D9D9D9"
        }
        fillOpacity={traction === "4x4" || traction === "front" ? 1 : 0.2}
      />
      <rect
        x="9"
        y="33"
        width="6"
        height="9"
        fill={
          traction === "4x4" || traction === "front" ? "#D9D9D9" : "#D9D9D9"
        }
        fillOpacity={traction === "4x4" || traction === "front" ? 1 : 0.15}
      />
      <rect
        width="24"
        height="11"
        fill={
          traction === "4x4" || traction === "front" ? "#D9D9D9" : "#D9D9D9"
        }
        fillOpacity={traction === "4x4" || traction === "front" ? 1 : 0.15}
      />
      <rect
        y="44"
        width="24"
        height="11"
        fill={
          traction === "4x4" || traction === "front" ? "#D9D9D9" : "#D9D9D9"
        }
        fillOpacity={traction === "4x4" || traction === "front" ? 1 : 0.15}
      />
      <rect
        x="67"
        y="13"
        width="6"
        height="9"
        fill={traction === "4x4" || traction === "rear" ? "#D9D9D9" : "#D9D9D9"}
        fillOpacity={traction === "4x4" || traction === "rear" ? 1 : 0.15}
      />
      <rect
        x="67"
        y="33"
        width="6"
        height="9"
        fill={traction === "4x4" || traction === "rear" ? "#D9D9D9" : "#D9D9D9"}
        fillOpacity={traction === "4x4" || traction === "rear" ? 1 : 0.15}
      />
      <rect
        x="58"
        width="24"
        height="11"
        fill={traction === "4x4" || traction === "rear" ? "#D9D9D9" : "#D9D9D9"}
        fillOpacity={traction === "4x4" || traction === "rear" ? 1 : 0.15}
      />
      <rect
        x="58"
        y="44"
        width="24"
        height="11"
        fill={traction === "4x4" || traction === "rear" ? "#D9D9D9" : "#D9D9D9"}
        fillOpacity={traction === "4x4" || traction === "rear" ? 1 : 0.15}
      />
    </svg>
  );
};
