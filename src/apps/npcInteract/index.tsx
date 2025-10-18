import { Button } from "@/components/common";
import { useNpcInteractStore } from "@/stores/apps";
import { isGameEnv } from "@/utils/helpers";
import { RPCManager } from "@/utils/rpc"; 
import { useEffect } from "react";
 
export const NpcInteract = () => {
  const npcInteractStore = useNpcInteractStore();

  useEffect(() => {
    if (!isGameEnv()) return;
    RPCManager.registerApp(NpcInteract.name, true);
    return () => RPCManager.unregisterApp(NpcInteract.name);
  }, []);

 

  const handleButtonClick = (identifier: string) => () => { 
  };

  return (
    <div className="h-screen w-full">
      <div
        className="h-full w-full"
        style={{
          background:
            "radial-gradient(58.58% 79.7% at 50% 20.3%, rgba(17, 17, 17, 0) 0%, rgba(17, 17, 17, 0.913667) 76.28%, #111111 100%)",
        }}
      >
        <div className="fixed bottom-[4vh] flex w-full items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-[.5vh]">
            <h2 className="bg-white px-[.2vw] text-[.6vw] font-extrabold tracking-wide text-dark-400">
              {npcInteractStore.name}
            </h2>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-[1.2vw] font-black italic text-warning">
                {npcInteractStore.title}
              </h1>
              <p className="w-2/3 text-center text-[.55vw] font-light text-white">
                {npcInteractStore.description}
              </p>
            </div>
            <div className="mt-[3vh] grid grid-cols-2 gap-x-[.5vw] gap-y-[1vh]">
              {npcInteractStore.options.map((option) => (
                <Button
                  className="py-[.75vh] text-[.7vw] flex justify-center"
                  variant={option.variant}
                  key={option.identifier}
                  onClick={handleButtonClick(option.identifier)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
