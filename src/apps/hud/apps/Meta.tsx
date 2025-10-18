import { ClockIcon, ShieldIcon } from "@/utils/icons/hud";
import { useHudStore } from "@/stores/apps";
import { isGameEnv } from "@/utils/helpers";
import { useEffect } from "react";

export const Meta = () => {
  const { meta, registerApp, unregisterApp, stateApps } = useHudStore();
  const { setDate, setTime, date, time, rec, safezone } = meta;

  useEffect(() => {
    if (!isGameEnv()) return;
    registerApp?.("Meta");
    return () => unregisterApp?.("Meta");
  }, [registerApp, unregisterApp]);

  useEffect(() => {
    if (!isGameEnv() || !stateApps.Meta) return;
    const updateMeta = () => {
      const now = new Date();
      setDate(now.toLocaleDateString());
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    updateMeta();
    const interval = setInterval(updateMeta, 1000);
    return () => clearInterval(interval);
  }, [stateApps.Meta, setDate, setTime]);

  return stateApps.Meta ? (
    <div className="absolute bottom-[1.5vh] right-[1vw]">
      <div className="flex items-center justify-end gap-[0.8vw]">
        {rec && (
          <div className="flex border-error items-center justify-center gap-[0.3vw] rounded-[.7vh] border-[.1vh] bg-transparent px-[0.35vw] py-[0.4vh]">
            <div className="bg-error h-[0.7vh] w-[0.35vw] rounded-[50vh]"></div>
            <h1 className="text-error text-[0.55vw] font-extrabold">REC</h1>
          </div>
        )}
        {safezone && (
          <div className="flex items-center justify-center gap-[0.3vw] rounded-[.7vh] bg-success/10 px-[0.35vw] py-[0.4vh]">
            <ShieldIcon className="w-[0.7vw] text-success" />
            <h1 className="text-[0.55vw] font-bold text-success">SAFE-ZONE</h1>
          </div>
        )}
        <div className="flex items-center justify-end gap-[0.1vw]">
          <h1 className="text-[0.55vw] text-light/80 text-shadow-sm">Data:</h1>
          <span className="text-[0.6vw] font-bold text-light text-shadow-sm">{date}</span>
        </div>
        <div className="flex items-center justify-end gap-[0.1vw]">
          <ClockIcon className="w-[0.75vw] text-light stroke-black stroke-[0.1vh]" />
          <h1 className="text-[0.6vw] font-bold text-light text-shadow-sm">{time}</h1>
        </div>
      </div>
    </div>
  ) : null;
};
