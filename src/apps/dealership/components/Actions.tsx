import { Button } from "@/components/common";
import vehicleColors from "@/consts/vehicleColors";
import { useDealershipStore } from "@/stores/apps";
import {
  AtmIcon,
  CoinDollarIcon,
  HandsWheelIcon,
} from "@/utils/icons/dealership";
import clsx from "clsx"; 
 

export const Actions = () => {
  const {
    vehicleColorIds,
    setSelectedColor,
    selectedColorId,
    selectedVehicle,
  } = useDealershipStore();

  const handleTestDrive = () => {
    if (!selectedVehicle) return;
     
  };

  const handlePurchase = (method: "cash" | "bank") => () => {
    if (!selectedVehicle) return; 
  };

  return (
    <div className="mr-[2.5vw] flex flex-col items-end justify-end absolute bottom-[25vh] right-0">
      <div className="grid grid-cols-4 gap-x-[1.3vw] gap-y-[2vh]">
        {vehicleColorIds.map((colorId) => (
          <div
            key={colorId}
            onClick={setSelectedColor.bind(null, colorId)}
            style={{
              backgroundColor: vehicleColors.find((c) => c.id === colorId)?.hex,
            }}
            className={clsx(
              "h-[2.4vh] w-[1.3vw] -skew-x-[16deg] cursor-pointer rounded-[.5vh] transition hover:ring-[.4vh] hover:ring-white",
              selectedColorId === colorId &&
                "cursor-default ring-[.4vh] ring-white"
            )}
          ></div>
        ))}
      </div>
      <div className="relative mt-[5vh] flex items-center justify-end">
        <div className="z-10 -mr-[1.2vw] skew-x-[-15deg] transform rounded-[.8vh] bg-dark-200 py-[1.4vh] pl-[.8vw] pr-[2vw]">
          <h1 className="skew-x-[15deg] text-[.6vw] font-bold uppercase italic tracking-wider text-white">
            Price
          </h1>
        </div>
        <div className="z-20 skew-x-[-15deg] transform rounded-[1.3vh] bg-success px-[.7vw] pb-[0.9vh] pt-[1vh] [box-shadow:-0.2vw_0_0_0.0vw_rgba(0,0,0,0.4)]">
          <div className="flex skew-x-[15deg] transform items-center gap-[0.3vw]">
            <CoinDollarIcon
              variant="primary"
              className="w-[1.1vw] text-dark-200"
            />
            <h1 className="text-[.9vw] font-black italic tracking-wider text-dark-200">
              
            </h1>
          </div>
        </div>
      </div>
      <div className="mt-[2.5vh] flex items-center justify-start gap-[0.8vw]">
        <Button variant="dark" arrowsColor="#FFCC22" onClick={handleTestDrive}>
          <div className="flex items-center justify-center gap-[0.3vw]">
            <h1 className="text-[1vw] font-black uppercase italic tracking-wider text-warning">
              TEST DRIVE
            </h1>
            <HandsWheelIcon className="w-[1.2vw] text-warning" />
          </div>
        </Button>
        <Button variant="secondary" onClick={handlePurchase("cash")}>
          <div className="flex items-center justify-center gap-[0.3vw]">
            <h1 className="text-[1vw] font-black uppercase italic tracking-wider">
              CASH
            </h1>
            <CoinDollarIcon variant="secondary" className="w-[1.2vw]" />
          </div>
        </Button>
        <Button variant="secondary" onClick={handlePurchase("bank")}>
          <div className="flex items-center justify-center gap-[0.3vw]">
            <h1 className="text-[1vw] font-black uppercase italic tracking-wider">
              BANK
            </h1>
            <AtmIcon className="w-[1.2vw]" />
          </div>
        </Button>
      </div>
    </div>
  );
};
