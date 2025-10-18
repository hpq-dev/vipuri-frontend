import { useGameEnvEffect } from "@/utils/hooks";
import { RPCManager } from "@/utils/rpc";
import { RedEffect } from "./components/RedEffect";
import { HeartEffect } from "./components/HeartEffect";
import { Button } from "@/components/common"; 
import { useDeathscreenStore } from "@/stores/apps";
 

export const DeathScreen = () => {
  const {
    cooldownRespawn,
    timeToRespawn,
    setCooldownRespawn,
    setTimeToRespawn,
  } = useDeathscreenStore();

  useGameEnvEffect(() => {
    RPCManager.registerApp(DeathScreen.name);
    return () => RPCManager.unregisterApp(DeathScreen.name);
  }, []);

  useGameEnvEffect(() => {
     
  }, []);

  const handleRespawn = () => {
    if (cooldownRespawn !== undefined) return; 
  };

  return (
    <div className="flex justify-center items-center w-full h-full relative bg-gradient-to-t from-black via-transparent to-transparent">
      <div className="flex z-50 justify-between absolute bottom-[4vh] items-end w-full">
        <div className="flex justify-start items-start flex-col gap-[2vh] ml-[2vw]">
          <HeartEffect className="w-[12vw]" />
          <h1 className="text-white uppercase font-black italic text-[1.5vw] w-2/3">
            ESTI IN COMA, NU POTI VORBI DAR INCA POTI FI AJUTAT.
          </h1>
        </div>
        <div className="flex justify-center items-center flex-col mr-[2vw]">
          <div className="flex justify-center items-center gap-[0.5vw]">
            <h1 className="text-white font-normal text-[.6vw] italic">
              Respawn automat in
            </h1>
            <div className="flex bg-white justify-center items-center py-[0.1vh] px-[0.2vw]">
              <h1 className="text-primary text-[.6vw] font-bold">
                {timeToRespawn == undefined ? "00:00" : timeToRespawn}
              </h1>
            </div>
          </div>
          <div className="flex justify-end items-center">
            <Button
              onClick={handleRespawn}
              disabled={cooldownRespawn !== undefined}
              variant="primary"
              className="mt-[1vh] flex whitespace-nowrap justify-start h-[4vh] items-center w-[11vw] text-start gap-[0.5vw] leading-none"
            >
              <span className="text-[.8vw] pointer-events-none flex items-center">
                Respawn in
              </span>
              <div className="flex pointer-events-none bg-white justify-center items-center py-[0.4vh] px-[0.3vw] leading-none">
                <h1 className="text-primary text-[.6vw] font-semibold">
                  {cooldownRespawn == undefined ? "00:00" : cooldownRespawn}
                </h1>
              </div>
            </Button>
          </div>
        </div>
      </div>
      <RedEffect className="w-full fixed bottom-0 pointer-events-none" />
    </div>
  );
};
