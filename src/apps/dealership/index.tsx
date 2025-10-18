import { VehicleInfo } from "./components/VehicleInfo";
import { Vehicles } from "./components/Vehicles";
import { Actions } from "./components/Actions";
import { Navbar } from "./components/Navbar";
import { useEffect } from "react";
import { isGameEnv } from "@/utils/helpers";
import { RPCManager } from "@/utils/rpc"; 
import { useDealershipStore } from "@/stores/apps";
 

export const Dealership = () => {
  const { setCategoryTypes, reset } = useDealershipStore();

  useEffect(() => {
    if (!isGameEnv()) return;
    RPCManager.registerApp(Dealership.name, true);
    return () => {
      reset();
      RPCManager.unregisterApp(Dealership.name);
    };
  }, [reset]);

  useEffect(() => {
    if (!isGameEnv()) return; 
  }, [setCategoryTypes]);

  return (
    <div className="h-screen w-full bg-cover">
      <div
        className="h-full w-full"
        style={{
          background:
            "radial-gradient(93.93% 67.59% at 50% 50%, rgba(17, 17, 17, 0.30) 0%, #111111 80%)",
        }}
      >
        <div className="flex w-full flex-col items-start justify-center gap-[5vh]">
          <Navbar />
          <VehicleInfo />
          <Actions />
          <Vehicles />
        </div>
      </div>
    </div>
  );
};
