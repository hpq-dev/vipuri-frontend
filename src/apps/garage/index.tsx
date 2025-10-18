import { useGarageStore } from "@/stores/apps/garage";
import { useEffect, useLayoutEffect } from "react";
import titlebar_img from "./assets/titlebar.png";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/common";
import { Card } from "./components/Card";
import { Door } from "./components/Door";
import { Bar } from "./components/Bar";
import clsx from "clsx";
import { RPCManager } from "@/utils/rpc"; 
import { useGameEnvEffect } from "@/utils/hooks";
import { isGameEnv } from "@/utils/helpers";
 

export const Garage = () => {
  const {
    setGarageMounted,
    setDoorAnimation,
    setSelectedFilter,
    setVehicles,
    selectedFilter,
    filters,
    vehicleOptions,
    garageMounted,
    doorAnimation,
    vehicles,
    selectedVehicle,
  } = useGarageStore();

  useGameEnvEffect(() => {
    RPCManager.registerApp(Garage.name, true);

    return () => {
      RPCManager.unregisterApp(Garage.name);
      setGarageMounted(false);
    };
  }, []);

  useGameEnvEffect(() => { 
  }, [selectedFilter, setVehicles]);

  useLayoutEffect(() => {
    setGarageMounted(true);
  }, [setGarageMounted]);

  useEffect(() => {
    if (garageMounted) {
      const timer = setTimeout(() => setDoorAnimation(true), 500);
      return () => clearTimeout(timer);
    }
  }, [garageMounted, setDoorAnimation]);

  const percent = (value: number) => Math.min(100, Math.round(value));

  const handleVehicleOptionClick = (option: string) => () => {
    if (!isGameEnv()) return;
    if (!selectedVehicle) return;
 
  };

  return (
    <div className="h-screen w-full">
      <div className="relative z-30 flex min-h-screen w-full flex-col items-center justify-center">
        <div className="relative z-30 flex w-full items-center justify-center">
          <img
            src={titlebar_img}
            alt="titlebar"
            className="z-30 w-[84.5vw] rounded-t-[4vh]"
          />
          <h1 className="absolute right-0 top-[4vh] z-40 mb-[4vh] mr-[10vw] -translate-y-1/2 rounded-[.5vh] bg-error px-[0.5vw] py-[0.3vh] text-[.7vw] font-semibold italic text-white">
            ESC
          </h1>
        </div>

        <div className="relative bottom-[3vh] flex h-[85vh] w-full items-start justify-center">
          <div
            className="z-20 h-full w-[1vw] rounded-bl-[.8vh] bg-dark-300"
            style={{ boxShadow: "0.3vw 0 1vh 0 rgba(0, 0, 0, 0.5)" }}
          ></div>
          <div className="relative h-full w-full max-w-[81vw] overflow-hidden">
            <AnimatePresence>
              <Door isOpen={doorAnimation} isMounted={garageMounted} />
            </AnimatePresence>

            <div className="absolute inset-0 z-0 flex flex-col items-start justify-start bg-dark-300 px-[1vw] py-[3vh]">
              <div className="flex w-full items-center justify-between">
                <div className="flex max-w-[15.5vw] flex-col items-start justify-start gap-[1vh]">
                  <div className="flex items-center justify-start gap-[2.6vw]">
                    <h1 className="text-[1.7vw] font-extrabold italic text-white">
                      MY GARAGE
                    </h1>
                    <h1 className="bg-white px-[.5vw] py-[.5vh] text-[1.3vw] font-black italic text-black">
                      {vehicles.length}
                    </h1>
                  </div>
                  <p className="w-full text-[.65vw] font-normal text-white/60">
                    Explore your entire vehicle collection and manage them by
                    garage with ease.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-[0.7vw]">
                  {filters.map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setSelectedFilter(key)}
                      style={{ textShadow: "0 0.2vh 0.1vw rgba(0, 0, 0, 0.5)" }}
                      className={clsx(
                        "w-[5.5vw] rounded-[.7vh] px-[.5vh] py-[.65vh] text-[.8vw] font-bold uppercase italic tracking-wide transition",
                        selectedFilter === key
                          ? "bg-primary text-white/80"
                          : "cursor-pointer bg-dark-100 text-white/50 hover:bg-primary/50"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-[4vh] grid max-h-[50vh] w-full grid-cols-5 gap-[0.7vw] overflow-y-auto scroll-smooth pr-[0.3vw] [&::-webkit-scrollbar-thumb]:rounded-[.5vh] [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-track]:rounded-[.5vh] [&::-webkit-scrollbar]:w-[0.5vw] [&::-webkit-scrollbar]:rounded-[.5vh] [&::-webkit-scrollbar]:bg-dark-100">
                {vehicles.map((vehicle) => (
                  <Card key={vehicle.id} {...vehicle} />
                ))}
              </div>

              {selectedVehicle && (
                <div className="absolute bottom-0 mt-[4vh] flex h-[13vh] w-[79vw] items-center justify-between bg-dark-400 px-[1vw] py-[1vh]">
                  <div className="flex items-center justify-center gap-[3vw]">
                    <div className="flex flex-col items-start justify-start gap-[0.3vh]">
                      <div className="flex items-center justify-start gap-[0.5vw]">
                        
                      </div>
                      <h1 className="text-[1.2vw] font-extrabold uppercase italic text-white">
                        {selectedVehicle.model.name}
                      </h1>
                    </div>

                    <div className="flex flex-col items-start justify-start gap-[0.3vh]">
                      <div className="flex items-center justify-start gap-[0.5vw]">
                        <h1 className="text-[1vw] font-bold uppercase italic text-success">
                          PORTBAGAJ
                        </h1>
                        <h2 className="text-[1vw] font-bold uppercase italic text-white">
                          0 / {selectedVehicle.model.maxTrunkStorage}
                        </h2>
                      </div>

                      <div className="flex items-center justify-start gap-[0.5vw]">
                        <h1 className="text-[1vw] font-bold uppercase italic text-success">
                          NR KILOMETRI
                        </h1>
                        <h2 className="text-[1vw] font-bold uppercase italic text-white">
                          {selectedVehicle.odometer} KM
                        </h2>
                      </div>
                    </div>

                    <div className="flex flex-col items-start justify-start gap-[0.3vh]">
                      <div className="flex items-center justify-start gap-[0.7vw]">
                        <h1 className="text-[1vw] font-bold uppercase italic text-success">
                          BENZINA
                        </h1>
                        <Bar
                          value={percent(selectedVehicle.fuelPercent ?? 0)}
                        />
                        <h1 className="text-[.9vw] font-bold uppercase italic text-white">
                          {percent(selectedVehicle.fuelPercent ?? 0)}%
                        </h1>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-start gap-[0.7vw]">
                    {vehicleOptions.map((option) => (
                      <Button
                        key={option}
                        className="flex h-[5vh] w-[7.5vw] items-center justify-center text-[1vw] text-white/50"
                        arrowsColor="#ffffff80"
                        variant="dark"
                        scale="sm"
                        onClick={handleVehicleOptionClick(option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            className="z-20 h-full w-[1vw] rounded-br-[.8vh] bg-dark-300"
            style={{ boxShadow: "-0.3vw 0 1vh 0 rgba(0, 0, 0, 0.5)" }}
          ></div>
        </div>
      </div>
    </div>
  );
};
