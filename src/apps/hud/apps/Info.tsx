import { DollarIcon, SignalIcon } from "@/utils/icons/hud";
import { useHudStore } from "@/stores/apps";
import { Logo } from "@/components/common"; 
import { useCommonStore } from "@/stores";
import { useGameEnvEffect } from "@/utils/hooks";
 
export const Info = () => {
  const { info, registerApp, unregisterApp, stateApps } = useHudStore();
  const { user } = useCommonStore();

  useGameEnvEffect(() => {
    registerApp?.(Info.name);
    return () => unregisterApp?.(Info.name);
  }, [registerApp, unregisterApp]);

  useGameEnvEffect(() => {
    
  }, [info.setPlayersOnline, info.setPlayerId]);

  return stateApps.Info ? (
    <div className="absolute right-[1vw] top-[1.5vh]">
      <div className="flex flex-col items-end justify-end gap-[0.7vh]">
        <div className="flex flex-col items-end justify-end">
          <Logo scale="sm" />
          <div className="absolute flex items-center justify-center rounded-[.7vh] bg-success px-[0.35vw] py-[0.1vh]">
            <h1 className="text-[0.5vw] font-extrabold text-black">BETA</h1>
          </div>
        </div>
        <div className="flex items-center justify-end gap-[0.5vw]">
          <div className="flex items-center justify-end gap-[0.2vw]">
            <h1 className="text-[0.55vw] text-light/50">#</h1>
            <h1 className="text-[0.7vw] mr-[0.2vw] text-shadow-xs font-bold text-light">
              {info.playerId}
            </h1>
          </div>
          <div className="flex items-center justify-end gap-[0.2vw]">
            <SignalIcon className="w-[0.7vw] text-success" />
            <h1 className="text-[0.7vw] mr-[0.2vw] text-shadow-xs font-bold text-success">
              {info.playersOnline}
            </h1>
          </div>
        </div>
        <div className="mt-[5vh] flex flex-col items-end justify-end gap-[0.5vh]">
          <h1 className="text-[.6vw] font-bold italic text-light text-shadow-xs">
            BANI CASH
          </h1>
          <div className="flex items-center justify-center gap-[0.3vw] rounded-[1vh] bg-primary px-[0.35vw] py-[0.3vh]">
            <h1 className="text-[.7vw] font-bold italic text-light">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }).format(user?.money ?? 0)}
            </h1>
            <div className="flex h-[1.6vh] w-[0.8vw] items-center justify-center rounded-[50vh] bg-light">
              <DollarIcon className="w-[0.3vw] text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
