import { Button } from '@/components/common';
import { CoinDollarIcon } from '@/utils/icons/dealership';
import { FishCard } from './FishCard';
import { FishInfo } from './FishInfo';
import { useFishshopStore } from '@/stores/apps';

export const SellFish = () => {
  const fishShopStore = useFishshopStore();
  return (
    <div className="flex h-full w-[30vw] flex-col items-start justify-between rounded-[.7vh] bg-dark-300 px-[.7vw] py-[1vh]">
      <div className="flex flex-col items-start justify-center">
        <div className="flex items-center justify-start gap-[1vw]">
          <h1 className="text-[.9vw] font-extrabold italic text-light/60">
            VINDETI PESTI
          </h1>
          <div className="flex items-center justify-center gap-[0.3vw] bg-white px-[0.3vw] py-[0.1vh]">
            <h1 className="text-[.7vw] font-extrabold uppercase text-dark-400">
              41
            </h1>
            <h1 className="text-[.7vw] font-extrabold uppercase text-dark-400">
              PESTI
            </h1>
          </div>
        </div>
        <div className="mt-[2vh] grid max-h-[50vh] w-full grid-cols-3 gap-x-[.5vw] gap-y-[1vh] overflow-y-auto scroll-smooth pr-[0.5vw] [&::-webkit-scrollbar-thumb]:rounded-[.5vh] [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-track]:rounded-[.5vh] [&::-webkit-scrollbar]:w-[0.3vw] [&::-webkit-scrollbar]:rounded-[.5vh] [&::-webkit-scrollbar]:bg-dark-100">
          {fishShopStore.fishes.map(fish => (
            <FishCard key={fish.id} />
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <FishInfo />
        <Button
          variant="secondary"
          className="flex w-full items-center justify-center"
        >
          <div className="flex items-center justify-center gap-[0.4vw]">
            <h1 className="text-[1vw] font-extrabold uppercase italic">
              VINDE TOT
            </h1>
            <CoinDollarIcon
              variant="primary"
              className="w-[1.2vw] text-white"
            />
          </div>
        </Button>
      </div>
    </div>
  );
};
