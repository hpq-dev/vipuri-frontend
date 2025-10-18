import { CoinDollarIcon } from '@/utils/icons/dealership';

export const FishInfo = () => {
  return (
    <div className="mb-[2vh] flex w-full items-center justify-between">
      <h1 className="text-[1.2vw] font-extrabold italic text-white">
        TOTAL / <span className="italic text-success">24KG</span>
      </h1>
      <div className="relative flex items-center justify-end">
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
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }).format(100000)}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
