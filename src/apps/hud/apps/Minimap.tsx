import { MicrophoneIcon, RadioIcon } from "@/utils/icons/hud";
import { isGameEnv } from "@/utils/helpers/GameEnv";
import { useGameEnvEffect } from "@/utils/hooks";
import { useHudStore } from "@/stores/apps";
import { useEffect, useState, useMemo } from "react";
import clsx from "clsx"; 
 

interface IMinimapAnchor {
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
  leftX: number;
  bottomY: number;
  rightX: number;
  topY: number;
}

export const Minimap = () => {
  const { minimap, registerApp, unregisterApp, stateApps } = useHudStore();
  const [minimapAnchor, setMinimapAnchor] = useState<IMinimapAnchor>();

  useEffect(() => {
    if (!isGameEnv()) return;
    registerApp?.("Minimap");
    return () => unregisterApp?.("Minimap");
  }, [registerApp, unregisterApp]);

 

  const minimapStyles = useMemo(() => {
    if (!minimapAnchor) return {};

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    return {
      position: "absolute" as const,
      left: `${minimapAnchor.rightX * screenWidth}px`,
      top: `${minimapAnchor.topY * screenHeight}px`,
    };
  }, [minimapAnchor]);

  const responsiveSizes = useMemo(() => {
    if (!minimapAnchor)
      return {
        iconSize: "1.2vw",
        fontSize: "0.5vw",
        gap: "1vw",
        verticalGap: "2.5vh",
      };

    const minimapWidthVw =
      ((minimapAnchor.width * window.innerWidth) / window.innerWidth) * 100;
    const minimapHeightVh =
      ((minimapAnchor.height * window.innerHeight) / window.innerHeight) * 100;

    const scaleFactor = Math.min(minimapWidthVw / 20, minimapHeightVh / 15); // Adjust base ratios as needed

    return {
      iconSize: `${Math.max(0.8, Math.min(2.0, 1.2 * scaleFactor))}vw`,
      fontSize: `${Math.max(0.3, Math.min(0.8, 0.5 * scaleFactor))}vw`,
      gap: `${Math.max(0.5, Math.min(2.0, 1.0 * scaleFactor))}vw`,
      verticalGap: `${Math.max(1.5, Math.min(4.0, 2.5 * scaleFactor))}vh`,
    };
  }, [minimapAnchor]);

  return stateApps.Minimap ? (
    <div className="absolute" style={minimapStyles}>
      <div
        className="flex items-center justify-start w-full h-full"
        style={{ gap: responsiveSizes.gap }}
      >
        <div
          className="flex flex-col items-center justify-center"
          style={{ gap: responsiveSizes.verticalGap }}
        >
          {/* Radio Section */}
          <div className="flex flex-col items-center justify-center gap-[0.8vh]">
            <RadioIcon
              className="text-light"
              style={{ width: responsiveSizes.iconSize }}
            />
            <div
              className={clsx(
                "mt-[0.5vh] flex h-[2vh] w-fit items-center justify-center rounded-[.7vh] px-[.25vw] transition-all duration-300",
                minimap.radio ? "bg-secondary" : "bg-error",
              )}
            >
              <h1
                className="font-bold tracking-wider text-light"
                style={{ fontSize: responsiveSizes.fontSize }}
              >
                {minimap.radio ? "ON" : "OFF"}
              </h1>
            </div>
          </div>

          {/* Microphone Section */}
          <div className="flex flex-col items-center justify-center gap-[0.8vh]">
            <MicrophoneIcon
              className="text-light"
              style={{ width: responsiveSizes.iconSize }}
            />

            {/* Voice Activity Indicators */}
            <div className="flex w-full items-center justify-center gap-[0.2vw]">
              <div
                className={clsx(
                  "h-[0.65vh] w-[0.30vw] transition-all duration-150",
                  minimap.speaking ? "bg-secondary" : "bg-white",
                )}
              />
              <div
                className={clsx(
                  "h-[0.65vh] w-[0.30vw] transition-all duration-150",
                  minimap.speaking ? "bg-secondary" : "bg-white",
                )}
              />
              <div
                className={clsx(
                  "h-[0.65vh] w-[0.30vw] transition-all duration-150",
                  minimap.speaking ? "bg-secondary" : "bg-white",
                )}
              />
            </div>

            <div
              className={clsx(
                "mt-[0.5vh] flex h-[2vh] w-fit items-center justify-center rounded-[.7vh] px-[.25vw] transition-all duration-300",
                minimap.speaking ? "bg-secondary" : "bg-error",
              )}
            >
              <h1
                className="font-bold tracking-wider text-light"
                style={{ fontSize: responsiveSizes.fontSize }}
              >
                {minimap.speaking ? "ON" : "OFF"}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
