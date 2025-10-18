import CircularProgress from "./components/layout/CircularProgress";
import { InventoryContainer } from "./components/Inventory";
import { DropToDeleteBox } from "./components/DropDelete";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownIcon } from "@/utils/icons/inventory";
import { useInventoryStore } from "@/stores/apps";
import { FoodComponent } from "./components/Food";
import type { TInventoryPage } from "./types";
import { useEffect, useState } from "react";
import { DragDropProvider } from "./hooks";
import clsx from "clsx";
import { useGameEnvEffect } from "@/utils/hooks";
import { RPCManager } from "@/utils/rpc";

export const Inventory = () => {
  const [inventoryPage, setInventoryPage] =
    useState<TInventoryPage>("PROXIMITY");
  const inventoryPages: TInventoryPage[] = ["CRAFTING", "PROXIMITY"];

  const {
    initializeContainer,
    backpackVisible,
    vehicleStorageVisible,
    loadItems,
  } = useInventoryStore();

  useGameEnvEffect(() => {
    RPCManager.registerApp(Inventory.name, true);
    loadItems();
    return () => RPCManager.unregisterApp(Inventory.name);
  }, []);

  useEffect(() => {
    initializeContainer({
      id: "player_inventory",
      label: "Inventar",
      type: "INVENTORY",
      maxSlots: 28,
      maxWeight: 50,
    });
    initializeContainer({
      id: "player_equipment",
      label: "Echipament",
      type: "EQUIPMENT",
      maxSlots: 11,
      maxWeight: 100,
    });
    initializeContainer({
      id: "player_crafting",
      label: "Crafting",
      type: "CRAFTING",
      maxSlots: 8,
      maxWeight: 1000,
    });
    initializeContainer({
      id: "player_proximity",
      label: "Proximitate",
      type: "PROXIMITY",
      maxSlots: 8,
      maxWeight: 1000,
    });
    initializeContainer({
      id: "player_crafting_result",
      label: "Rezultat",
      type: "CRAFTING_RESULT",
      maxSlots: 4,
      maxWeight: 1000,
    });
    initializeContainer({
      id: "player_fast_slots",
      label: "Fast Slots",
      type: "FAST_SLOTS",
      maxSlots: 5,
      maxWeight: 1000,
    });
    initializeContainer({
      id: "player_backpack",
      label: "Geanta",
      type: "BACKPACK",
      maxSlots: 28,
      maxWeight: 50,
    });
    initializeContainer({
      id: "player_vehicle_storage",
      label: "Portbagaj",
      type: "VEHICLE_STORAGE",
      maxSlots: 28,
      maxWeight: 50,
    });
  }, [initializeContainer]);

  return (
    <div className="relative h-screen w-full select-none bg-cover bg-center">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(42.84% 65.47% at 50% 50%, rgba(17, 17, 17, 0) 0%, rgba(17, 17, 17, 0.98) 100%)",
        }}
      />
      <DragDropProvider>
        <div className="relative flex min-h-screen w-full items-center justify-center">
          <div className="flex w-full items-center justify-between">
            <InventoryContainer containerId="player_inventory" />
            <div className="flex flex-col items-center justify-center">
              <CircularProgress percentage={30} />
              <InventoryContainer containerId="player_equipment" />
              <div className="mb-[5vh] mr-[5vw] mt-[6vh]">
                <InventoryContainer containerId="player_fast_slots" />
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-[3vh]">
              <div className="ml-[2.5vw] flex items-center justify-start gap-[0.7vw]">
                {inventoryPages.map((page, index) => (
                  <button
                    key={index}
                    onClick={() => setInventoryPage(page)}
                    className={clsx(
                      "w-[6vw] cursor-pointer rounded-[0.8vh] py-[0.5vh] text-[0.7vw] font-semibold uppercase italic transition duration-200",
                      page === inventoryPage
                        ? "bg-primary text-light"
                        : "bg-dark-200 text-light/70 hover:bg-primary hover:text-light"
                    )}
                  >
                    {page}
                  </button>
                ))}
              </div>
              {inventoryPage === "CRAFTING" ? (
                <div className="flex flex-col items-center justify-center gap-[5vh]">
                  <InventoryContainer containerId="player_crafting" />
                  <ArrowDownIcon className="w-[4vw] text-light/10" />
                  <InventoryContainer containerId="player_crafting_result" />
                </div>
              ) : (
                <div className="mb-[30vh] flex flex-col items-center justify-center gap-[5vh]">
                  <InventoryContainer containerId="player_proximity" />
                  <DropToDeleteBox />
                </div>
              )}
            </div>
            <AnimatePresence>
              {backpackVisible && (
                <motion.div
                  initial={{ opacity: 0, x: 500 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 500 }}
                  transition={{ duration: 0.5 }}
                  className="absolute right-[0vw] z-20 flex h-full items-center justify-center bg-dark-400 px-[1vw] py-[2vh] shadow-[0_0_0.7vw_1vh_rgba(0,0,0,0.5)]"
                >
                  <InventoryContainer containerId="player_backpack" />
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {vehicleStorageVisible && (
                <motion.div className="absolute right-[0vw] flex h-full items-center justify-center bg-dark-400 px-[1vw] py-[2vh] shadow-[0_0_0.7vw_1vh_rgba(0,0,0,0.5)]">
                  <InventoryContainer containerId="player_vehicle_storage" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <FoodComponent />
      </DragDropProvider>
      <div className="absolute right-[0.7vw] top-[1vh] z-50 flex items-center justify-center rounded-[.7vh] bg-red-500 px-[0.5vw] py-[0.2vh]">
        <h1 className="text-[0.65vw] font-semibold uppercase italic text-light">
          ESC
        </h1>
      </div>
    </div>
  );
};
