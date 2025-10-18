import { Button } from "@/components/common";
import { FishCard } from "./FishCard";
import { useFishshopStore } from "@/stores/apps";

export const FishStore = () => {
  const fishShopStore = useFishshopStore();

  const handleBack = () => {
    fishShopStore.setPage("home");
  };
  return (
    <div className="flex h-full w-full flex-col items-start justify-start rounded-[.7vh] bg-dark-300 px-[.7vw] py-[1vh]">
      <div className="flex flex-col items-start justify-center">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-start justify-start">
            <h1 className="text-[.9vw] font-extrabold italic text-light/60">
              SHOP
            </h1>
            <p className="w-[50%] text-start text-[.65vw] font-semibold leading-[1.2] text-white/60">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.{" "}
            </p>
          </div>
          <div className="flex items-center justify-end gap-[0.5vw]">
            <Button variant="secondary" scale="sm">
              BUY
            </Button>
            <Button onClick={handleBack} variant="dark" scale="sm">
              BACK TO MENU
            </Button>
          </div>
        </div>
        <div className="mt-[2vh] grid max-h-[60vh] w-full grid-cols-7 gap-x-[.6vw] gap-y-[1vh] overflow-y-auto scroll-smooth [&::-webkit-scrollbar-thumb]:rounded-[.5vh] [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-track]:rounded-[.5vh] [&::-webkit-scrollbar]:w-[0.3vw] [&::-webkit-scrollbar]:rounded-[.5vh] [&::-webkit-scrollbar]:bg-dark-100 [&::-webkit-scrollbar]:pr-[0.5vw]">
          {fishShopStore.items.map((item) => (
            <FishCard key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
