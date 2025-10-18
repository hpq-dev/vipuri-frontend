import { SecondaryTexture } from "./textures/Secondary";
import { InfoIcon } from "@/utils/icons/dealership";
import React from "react";
import { Traction } from "./layout/Traction";
import { useDealershipStore } from "@/stores/apps";

export const VehicleInfo = () => {
  const { selectedVehicle, selectedCategoryType } = useDealershipStore();

  // const percent = (value: number, type: "KM" | "%") => {
  //   return type === "%"
  //     ? Math.min(100, Math.round(value))
  //     : Math.min(
  //         100,
  //         Math.round(
  //           (value / dealershipStore.selectedVehicle!.model.maxSpeed) * 100
  //         )
  //       );
  // };

  return (
    <div className="flex flex-col items-start justify-start">
      <h1 className="ml-[2.5vw] bg-white px-[.2vw] py-[.1vh] text-[.55vw] font-extrabold uppercase text-black">
        {selectedCategoryType}
      </h1>
      <div className="flex items-center justify-start">
        <SecondaryTexture />
        <div className="absolute ml-[2.5vw] text-[1.2vw] font-extrabold uppercase italic tracking-wider text-light">
          {selectedVehicle?.model.name}
        </div>
      </div>
      <div className="ml-[2.5vw] flex items-center justify-start gap-[0.5vw]">
        <h1 className="text-[1vw] font-extrabold italic tracking-wide text-warning">
    
        </h1>
        <InfoIcon className="w-[1vw] text-warning" />
      </div>
      <div className="ml-[2.5vw] mt-[3vh] grid grid-cols-[max-content_1fr_max-content] items-center gap-x-[.7vw] gap-y-[1vh]">
        
      </div>
      <div className="ml-[2.5vw] mt-[3vh] flex flex-col items-start justify-start">
        <h1 className="text-[1.2vw] font-extrabold italic text-white">
          TRACTIUNE
        </h1>
        <p className="w-1/2 text-[.65vw] font-medium text-white/60">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <Traction className="mt-[2vh] w-[4vw]" />
      </div>
    </div>
  );
};
