import { useStoreKitStore } from '@/stores/apps';
import { Card } from './Card';
import clsx from 'clsx';

export const StoreItems = () => {
  const storeKitStore = useStoreKitStore();
  const categoryData = storeKitStore.categoryData.find(
    category => category.identifier === storeKitStore.category
  );
  return (
    <div className="flex flex-col items-start justify-start gap-[3vh]">
      <div className="flex flex-col items-start justify-start gap-[1vh]">
        <div className="flex items-center justify-start gap-[0.7vw]">
          <h1 className="text-[1.5vw] font-extrabold italic text-white">
            {categoryData ? categoryData.name : 'ALL CATEGORIES'}
          </h1>
          <h1
            className={clsx(
              'rotate-[5deg] px-[.3vw] py-[.1vh] text-[1.4vw] font-extrabold text-white',
              categoryData ? categoryData?.color : 'bg-primary'
            )}
          >
            STORE
          </h1>
        </div>
        <p className="w-full text-[.65vw] text-white/60">
          {categoryData
            ? categoryData.description
            : 'Explore our collection of items across various categories. Find the perfect fit for your style and needs.'}
        </p>
      </div>

      <div className="flex w-full flex-col items-start justify-start">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-nowrap text-[.9vw] font-extrabold italic text-white/60">
            NAME CATEGORY
          </h1>
          <div className="mx-[1vw] w-full bg-dark-200 px-[.5vw] py-[.25vh]"></div>
          <h1 className="w-full text-nowrap bg-dark-100 px-[0.3svw] py-[0.1vh] text-center text-[.7vw] font-bold text-white">
            21 CLOTHES
          </h1>
        </div>
        <div
          className={clsx(
            'my-[2vh] grid w-full grid-cols-3 gap-[.6vw] overflow-y-auto scroll-smooth pr-[0.3vw] [&::-webkit-scrollbar-thumb]:rounded-[.5vh] [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-track]:rounded-[.5vh] [&::-webkit-scrollbar]:w-[0.3vw] [&::-webkit-scrollbar]:rounded-[.5vh] [&::-webkit-scrollbar]:bg-dark-100',
            storeKitStore.category === 'TATTOOS'
              ? 'max-h-[68vh]'
              : 'max-h-[50vh]'
          )}
        >
          {storeKitStore.cards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};
