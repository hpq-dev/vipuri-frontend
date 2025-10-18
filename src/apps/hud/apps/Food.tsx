import { CupIcon, FoodIcon } from "@/utils/icons/hud";
import { useHudStore } from "@/stores/apps";
import { useEffect } from "react";
import { isGameEnv } from "@/utils/helpers";

export const Food = () => {
  const { registerApp, unregisterApp } = useHudStore();

  const foodValues = [
    {
      value: 50,
      colorProgress: "bg-warning",
      color: "bg-warning/20",
      iconColor: "text-warning",
      icon: FoodIcon,
    },
    {
      value: 50,
      colorProgress: "bg-secondary",
      color: "bg-secondary/20",
      iconColor: "text-secondary",
      icon: CupIcon,
    },
  ];

  useEffect(() => {
    if (!isGameEnv()) return;
    registerApp?.("Food");
    return () => unregisterApp?.("Food");
  }, [registerApp, unregisterApp]);

  return (
    <div className="absolute bottom-[1.5vh] left-[0vh] flex w-full items-center justify-center">
      <div className="flex items-center justify-center gap-[1vw]">
        {foodValues.map(({ value, icon: Icon, color, colorProgress, iconColor }, index) => (
          <div key={index} className="flex flex-col items-center justify-center gap-[1vh]">
            <Icon className={`w-[1.2vw] ${iconColor}`} />
            <div className={`relative h-[0.9vh] w-[2vw] ${color}`}>
              <div className={`absolute left-[0vh] top-[0vh] h-full ${colorProgress}`} style={{ width: `${value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
