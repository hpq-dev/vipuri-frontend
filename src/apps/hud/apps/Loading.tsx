import { useHudStore } from "@/stores/apps";
import { isGameEnv } from "@/utils/helpers";
import React, { useEffect } from "react"; 
import clsx from "clsx";
 

const Triangle = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props} viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.0059 10.57C15.6241 12.8609 13.5254 14.9596 11.2344 14.3414L2.97318 12.1122C0.689188 11.4959 -0.0734142 8.63972 1.59938 6.96693L7.6314 0.934899C9.30419 -0.737895 12.1603 0.0247052 12.7767 2.3087L15.0059 10.57Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const Loading = () => {
  const { registerApp, unregisterApp, stateApps, loading } = useHudStore();

  const petalCount = 8;
  const radiusVW = 1.3;

  useEffect(() => {
    
  }, []);

  useEffect(() => {
    if (!isGameEnv()) return;
    registerApp?.(Loading.name);
    return () => unregisterApp?.(Loading.name);
  }, [registerApp, unregisterApp]);

  return stateApps.Loading ? (
    <div className="mb-[12vh] flex w-full flex-col items-center justify-center gap-[2.5vh]">
      <div className="relative h-[calc(2.6vw)] w-[calc(2.6vw)]">
        {Array.from({ length: petalCount }).map((_, index) => {
          const angle = (360 / petalCount) * index;
          const delay = index * 0.1;
          const activePetals = Math.round(
            (loading.value / loading.goal) * petalCount
          );

          return (
            <div
              key={index}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `rotate(${angle + 3}deg) translateY(-${radiusVW}vw)`,
                transformOrigin: "center center",
                animationDelay: `${delay}s`,
              }}
            >
              <Triangle
                className={clsx(
                  "w-[0.9vw]",
                  index < activePetals ? "text-success" : "text-success/10"
                )}
                style={{ rotate: `${index - 20 + 180}deg` }}
              />
            </div>
          );
        })}
      </div>

      <h1 className="ml-[0.8vw] whitespace-pre-line text-center text-[0.65vw] font-bold uppercase italic text-light/80 text-shadow-xs">
        {loading.title}
      </h1>
    </div>
  ) : null;
};
