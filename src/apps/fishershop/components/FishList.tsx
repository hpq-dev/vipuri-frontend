import { Button } from "@/components/common";
import { FishCard } from "./FishCard";
import { useFishshopStore } from "@/stores/apps";

export const FishList = () => {
  const fishShopStore = useFishshopStore();

  const handleBack = () => {
    fishShopStore.setPage("home");
  };
  return (
    <div className="flex h-full w-full flex-col items-start justify-start rounded-[.7vh] bg-dark-300 px-[.7vw] py-[1vh]">
      <div className="flex flex-col items-start justify-center">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-start justify-start gap-[0.5vh]">
            <div className="flex items-center justify-start gap-[1vw]">
              <h1 className="text-[.9vw] font-extrabold italic text-light/60">
                INFO PESTI
              </h1>
              <div className="flex items-center justify-center gap-[0.3vw] bg-dark-100 px-[0.3vw] py-[0.1vh]">
                <h1 className="text-[.7vw] font-extrabold uppercase text-white">
                  41
                </h1>
                <h1 className="text-[.7vw] font-extrabold uppercase text-white">
                  PESTI
                </h1>
              </div>
            </div>
            <p className="w-[50%] text-start text-[.65vw] font-semibold leading-[1.2] text-white/60">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.{" "}
            </p>
          </div>
          <Button onClick={handleBack} variant="dark" scale="sm">
            BACK TO MENU
          </Button>
        </div>
        <div className="mt-[2vh] grid max-h-[60vh] w-full grid-cols-7 gap-x-[.6vw] gap-y-[1vh] overflow-y-auto scroll-smooth [&::-webkit-scrollbar-thumb]:rounded-[.5vh] [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-track]:rounded-[.5vh] [&::-webkit-scrollbar]:w-[0.3vw] [&::-webkit-scrollbar]:rounded-[.5vh] [&::-webkit-scrollbar]:bg-dark-100 [&::-webkit-scrollbar]:pr-[0.5vw]">
          {fishShopStore.allFishes.map((fish) => (
            <FishCard key={fish.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
