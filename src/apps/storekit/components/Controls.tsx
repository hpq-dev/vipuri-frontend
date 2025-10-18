import { ArrowLeftIcon, ArrowRightIcon } from '@/utils/icons/dealership';
import { useStoreKitStore } from '@/stores/apps';
import clsx from 'clsx';

export const Controls = () => {
  const storeKitStore = useStoreKitStore();

  const handleChangeFilter = (id: number) => {
    if (storeKitStore.selectedFilter === id) return;
    storeKitStore.setSelectedFilter(id);
  };

  const handleRotateVehicle = (to: 'left' | 'right') => {
    return console.log(to);
  };
  return (
    <div className="absolute top-[2.5vh] flex w-full flex-col items-center justify-center gap-[1.5vh]">
      <div className="flex items-center justify-center gap-[1vw]">
        <div
          onClick={() => handleRotateVehicle('left')}
          className="flex cursor-pointer items-center justify-center gap-[0.5vw] text-warning transition hover:text-warning/80"
        >
          <ArrowLeftIcon className="w-[1.1vw]" />
          <h1 className="text-[0.8vw] font-bold italic">ROTATE LEFT</h1>
        </div>
        <div
          onClick={() => handleRotateVehicle('right')}
          className="flex cursor-pointer items-center justify-center gap-[0.5vw] text-warning transition hover:text-warning/80"
        >
          <h1 className="text-[0.8vw] font-bold italic">ROTATE RIGHT</h1>
          <ArrowRightIcon className="w-[1.1vw]" />
        </div>
      </div>
      <div className="flex items-center justify-center gap-[0.5vw] rounded-[1vh] bg-dark-300 px-[.4vw] py-[0.6vh]">
        {storeKitStore.filters.map(({ id, name }) => (
          <h1
            key={id}
            onClick={() => handleChangeFilter(id)}
            className={clsx(
              'rounded-[.7vh] px-[0.6vw] py-[0.5vh] text-[0.75vw] font-extrabold italic transition duration-200',
              storeKitStore.selectedFilter === id
                ? 'bg-primary text-light'
                : 'cursor-pointer bg-dark-100 text-light/50 hover:bg-primary/60 hover:text-light'
            )}
          >
            {name}
          </h1>
        ))}
      </div>
    </div>
  );
};
