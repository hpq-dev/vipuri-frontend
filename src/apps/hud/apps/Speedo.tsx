import { useEffect } from "react";
import { FuelGauge, SpeedoArc, SpeedoTicks, SpeedoTicksExterior } from "../components/speedo";
import { SIZE } from "../data/speedo";
import { GasCanIcon } from "@/utils/icons/hud";
import { useHudStore } from "@/stores/apps";
import clsx from "clsx";
import { isGameEnv } from "@/utils/helpers";

export const Speedo = () => {
  const setScale = useHudStore((s) => s.speedo.setScale);
  const registerApp = useHudStore((s) => s.registerApp);
  const unregisterApp = useHudStore((s) => s.unregisterApp);
  const speedo = useHudStore((s) => s.speedo);

  useEffect(() => {
    if (!isGameEnv()) return;
    registerApp?.("Speedo");
    return () => unregisterApp?.("Speedo");
  }, [registerApp, unregisterApp]);

  useEffect(() => {
    const onResize = () => {
      const width = window.innerWidth;
      const minWidth = 320;
      const maxWidth = 1200;
      const minScale = 0.2;
      const maxScale = 0.8;

      let newScale = minScale;

      if (width <= minWidth) newScale = minScale;
      else if (width >= maxWidth) newScale = maxScale;
      else newScale = minScale + ((width - minWidth) / (maxWidth - minWidth)) * (maxScale - minScale);

      setScale(newScale);
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setScale]);

  return (
    speedo.toggle && (
      <div className="fixed bottom-[8vh] right-[2vw] z-50 flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          <svg
            width={250}
            height={245}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            fill="none"
            style={{ overflow: "visible" }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="1.72%" stopColor="#FFCC22" />
                <stop offset="47.41%" stopColor="#2CE24E" />
                <stop offset="93.1%" stopColor="#F63C3C" />
              </linearGradient>
              <linearGradient id="innerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="1.72%" stopColor="#FFCC22" />
                <stop offset="47.41%" stopColor="#2CE24E" />
                <stop offset="93.1%" stopColor="#F63C3C" />
              </linearGradient>
            </defs>

            <SpeedoArc progress={Math.min(speedo.speed / 240, 1)} />
            <SpeedoTicks />
            <SpeedoTicksExterior speed={speedo.speed} />
          </svg>

          <svg
            className="absolute mb-7"
            width={220}
            height={245}
            viewBox="0 0 201 175"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M31.957 169.843C18.3214 156.207 9.0354 138.834 5.27334 119.921C1.51128 101.008 3.4421 81.4041 10.8216 63.5883C18.2012 45.7725 30.698 30.5451 46.7318 19.8316C62.7656 9.11818 81.6162 3.3999 100.9 3.3999C120.184 3.3999 139.034 9.11818 155.068 19.8316C171.102 30.5451 183.599 45.7725 190.978 63.5883C198.358 81.4041 200.289 101.008 196.526 119.921C192.764 138.834 183.478 156.207 169.843 169.843L169.771 169.771C183.393 156.15 192.669 138.795 196.427 119.901C200.185 101.008 198.256 81.4243 190.885 63.627C183.513 45.8297 171.029 30.6181 155.012 19.9158C138.995 9.21352 120.164 3.50118 100.9 3.50118C81.6363 3.50118 62.8052 9.21352 46.7881 19.9158C30.7709 30.6181 18.2871 45.8297 10.9152 63.627C3.54334 81.4243 1.61452 101.008 5.37267 119.901C9.13082 138.795 18.4072 156.15 32.0286 169.771L31.957 169.843Z"
              stroke="white"
              strokeOpacity="0.25"
              strokeWidth="5.2"
              strokeMiterlimit="1"
              strokeDasharray="2.6 2.6"
            />
          </svg>

          <div className="pointer-events-none absolute left-1/2 top-1/2 mt-5 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2.5 text-center">
            <div className="flex h-6 w-6 items-center justify-center rounded-[1.2vh] bg-light">
              <h1 className="text-sm font-bold text-black">{speedo.gear}</h1>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1
                className={clsx(
                  "text-6xl font-extrabold italic leading-[1]",
                  speedo.speed > 180
                    ? "rotate-[-2deg] scale-[110%] text-error"
                    : speedo.speed > 100
                    ? "rotate-3 scale-105 text-warning"
                    : "text-light"
                )}
                style={{
                  transition: "transform 0.15s ease-out",
                }}
              >
                {speedo.speed}
              </h1>
              <h1 className="text-lg font-bold italic leading-[1] text-light">KMH</h1>
            </div>
            <GasCanIcon className="mt-3 w-5 text-warning" />
          </div>

          <FuelGauge progress={speedo.fuel} />
        </div>
      </div>
    )
  );
};
