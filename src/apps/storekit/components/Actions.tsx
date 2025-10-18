import { AtmIcon, CoinDollarIcon } from '@/utils/icons/dealership';
import { Button } from '@/components/common';

export const Actions = () => {
  return (
    <div className="absolute bottom-[3vh] right-[2vw]">
      <div className="flex flex-col items-end justify-end">
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
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                }).format(12311124)}
              </h1>
            </div>
          </div>
        </div>
        <div className="mt-[2.5vh] flex items-center justify-start gap-[0.8vw]">
          <Button
            variant="secondary"
            className="flex w-[7vw] items-center justify-center"
          >
            <div className="flex items-center justify-center gap-[0.3vw]">
              <h1 className="text-[1vw] font-black uppercase italic tracking-wider">
                CASH
              </h1>
              <CoinDollarIcon variant="secondary" className="w-[1.2vw]" />
            </div>
          </Button>
          <Button
            variant="secondary"
            className="flex w-[7vw] items-center justify-center"
          >
            <div className="flex items-center justify-center gap-[0.3vw]">
              <h1 className="text-[1vw] font-black uppercase italic tracking-wider">
                CARD
              </h1>
              <AtmIcon className="w-[1.2vw]" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
