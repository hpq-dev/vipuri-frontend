import { useDealershipStore } from "@/stores/apps";
import { Card } from "./layout/Card";
import { ArrowLeftIcon, ArrowRightIcon } from "@/utils/icons/dealership";
import { useEffect, useState } from "react";
import { fromAsset } from "@/utils/helpers";

export const Vehicles = () => {
  const { vehicles, selectedCategoryType, setSelectedVehicle } =
    useDealershipStore();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategoryType]);

  useEffect(() => {
    const vehicle = vehicles[currentIndex];
    setSelectedVehicle(vehicle ?? null);
  }, [setSelectedVehicle, currentIndex, vehicles]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? vehicles.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === vehicles.length - 1 ? 0 : prev + 1));
  };

  const getAllVisibleVehicles = () => {
    const total = vehicles.length;
    const visibleCount = Math.min(9, total);
    const center = Math.floor(visibleCount / 2);

    return Array.from({ length: visibleCount }, (_, i) => {
      const index = (currentIndex - center + i + total) % total;
      return {
        vehicle: vehicles[index],
        isCenter: i === center,
        position: i,
      };
    });
  };

  const visibleVehicles = getAllVisibleVehicles();
  const centerIndex = Math.floor(visibleVehicles.length / 2);

  return (
    <div className="fixed bottom-[1vh] w-full overflow-hidden">
      <div className="flex items-center justify-center gap-[0.6vw] px-[1vw]"> 
      </div>
    </div>
  );
};
