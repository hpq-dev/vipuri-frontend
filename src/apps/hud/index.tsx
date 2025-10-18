import { useHudStore } from "@/stores/apps";
import * as apps from "./apps";
import { useEffect } from "react";
import { isGameEnv } from "@/utils/helpers";
import { RPCManager } from "@/utils/rpc"; 
 
export const Hud = () => {
  const { activeApps, setAppStatus, setAppState } = useHudStore();

  useEffect(() => {
    if (!isGameEnv()) return;
    RPCManager.registerApp("Hud");
    return () => RPCManager.unregisterApp("Hud");
  }, []);

  useEffect(() => {
    if (!isGameEnv()) return;
    
  }, [setAppStatus, setAppState]);

  return (
    <div className="flex h-full w-full flex-col items-end justify-end">
      {Object.entries(apps)
        .filter(([key]) => activeApps.includes(key))
        .map(([key, Component]) => (
          <Component key={key} />
        ))}
    </div>
  );
};
