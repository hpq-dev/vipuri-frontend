import { useStoreKitStore } from '@/stores/apps';
import { Card } from './Card';
import { XMarkIcon } from '@/utils/icons/storekit';

export const Cart = () => {
  const storeKitStore = useStoreKitStore();
  return (
    <div className="flex w-full max-w-[18vw] flex-col items-start justify-start">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-nowrap text-[.9vw] font-extrabold italic text-white/60">
          CART
        </h1>
        <div className="mx-[1vw] w-full bg-dark-200 px-[.5vw] py-[.25vh]"></div>
        <h1 className="w-full text-nowrap bg-dark-100 px-[0.3svw] py-[0.1vh] text-center text-[.7vw] font-bold text-white">
          21 CLOTHES
        </h1>
      </div>
      <div className="my-[2vh] grid max-h-[50vh] w-full grid-cols-3 gap-[.6vw] overflow-y-auto scroll-smooth pr-[0.3vw] [&::-webkit-scrollbar-thumb]:rounded-[.5vh] [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-track]:rounded-[.5vh] [&::-webkit-scrollbar]:w-[0.3vw] [&::-webkit-scrollbar]:rounded-[.5vh] [&::-webkit-scrollbar]:bg-dark-100">
        {storeKitStore.cards.map((card, index) => (
          <div key={index} className="relative flex items-start justify-end">
            <Card {...card} />
            <XMarkIcon className="absolute w-[.9vw] cursor-pointer rounded-[.6vh] bg-error px-[.2vw] py-[.6vh] text-white transition hover:bg-error/80" />
          </div>
        ))}
      </div>
    </div>
  );
};
