import { isGameEnv } from "@/utils/helpers/GameEnv";
import { useHudStore } from "@/stores/apps"; 
import { useEffect } from "react";
 
export const Keys = () => {
  const {
    keys,
    registerApp,
    stateApps,
    unregisterApp,
    unRegisterKeys,
    registerKeys,
  } = useHudStore();

  useEffect(() => {
    if (!isGameEnv()) return;
    registerApp?.("Keys");
    return () => unregisterApp?.("Keys");
  }, [registerApp, unregisterApp]);

  useEffect(() => {
   
  }, [registerKeys, unRegisterKeys]);

  return stateApps.Keys ? (
    <div className="absolute left-[1.3vw] top-[0vh] flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-start justify-start gap-[1.5vh]">
        {keys.map(({ keyword, action }, index) => (
          <div
            key={index}
            className="flex items-center justify-start gap-[0.7vw]"
          >
            <div className="flex h-[2.5vh] w-fit px-[.4vw] items-center justify-center rounded-[.7vh] bg-dark-100">
              <h1 className="text-[0.8vw] font-bold text-light/60">
                {keyword}
              </h1>
            </div>
            <h1 className="text-[0.55vw] text-shadow-xs font-bold italic text-light/60">
              {action}
            </h1>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};
