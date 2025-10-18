import { Button } from "@/components/common";
import { FishIcon } from "@/utils/icons/fishershop";
import { Progress } from "./Progress";
import { CoinDollarIcon } from "@/utils/icons/dealership";
import { useFishshopStore } from "@/stores/apps";

export const Missions = () => {
  const fishShopStore = useFishshopStore();

  const handleNavigate = (page: "fishlist" | "store") => {
    fishShopStore.setPage(page);
  };
  return (
    <div className="flex h-full flex-col items-start justify-between">
      <div className="flex flex-col items-center justify-center gap-[1vh]">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-start justify-start gap-[0.5vh]">
            <div className="flex items-center justify-start gap-[1vw]">
              <h1 className="text-[.9vw] font-extrabold italic text-white/60">
                MISIUNI
              </h1>
              <div className="flex items-center justify-start gap-[0.3vw]">
                <div className="flex items-center justify-center bg-white px-[0.3vw] py-[0.1vh]">
                  <h1 className="font text-[.6vw] font-extrabold text-dark-400">
                    5 MISIUNI
                  </h1>
                </div>
                <div className="flex items-center justify-center bg-error px-[0.3vw] py-[0.1vh]">
                  <h1 className="font text-[.6vw] font-bold text-white">
                    2D:15H:23M
                  </h1>
                </div>
              </div>
            </div>
            <p className="w-[50%] text-start text-[.65vw] font-semibold leading-[1.2] text-white/60">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <div className="flex items-center justify-end gap-[0.5vw]">
            <Button
              onClick={() => handleNavigate("store")}
              className="flex w-[6vw] items-center justify-center"
              variant="primary"
              scale="sm"
            >
              <h1 className="text-[.9vw] font-bold uppercase italic">SHOP</h1>
            </Button>
            <Button
              onClick={() => handleNavigate("fishlist")}
              className="flex w-[8vw] items-center justify-center"
              variant="dark"
              scale="sm"
            >
              <h1 className="text-[.9vw] font-bold uppercase italic">
                INFO PESTI
              </h1>
            </Button>
          </div>
        </div>
        <div className="mt-[2vh] flex max-h-[45vh] w-full flex-col items-start justify-start gap-[1vh] overflow-y-auto scroll-smooth pr-[0.5vw] [&::-webkit-scrollbar-thumb]:rounded-[.5vh] [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-track]:rounded-[.5vh] [&::-webkit-scrollbar]:w-[0.3vw] [&::-webkit-scrollbar]:rounded-[.5vh] [&::-webkit-scrollbar]:bg-dark-100">
          {fishShopStore.missions.map(
            ({ title, description, money, progress }, index) => (
              <div
                key={index}
                className="flex w-full items-center justify-between rounded-[1vh] bg-dark-300 px-[0.4vw] py-[0.7vh]"
              >
                <div className="flex items-center justify-start gap-[0.7vw]">
                  <div className="flex items-center justify-center gap-[0.5vw]">
                    <div className="flex h-[4vh] w-[2.3vw] items-center justify-center rounded-[.7vh] bg-dark-200">
                      <FishIcon className="w-[1.5vw]" />
                    </div>
                    <div className="flex flex-col items-start justify-start leading-[1.2]">
                      <h1 className="text-[.9vw] font-extrabold uppercase italic text-white/60">
                        {title}
                      </h1>
                      <p className="max-w-[20vw] text-[.7vw] font-medium text-white/60">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
                <Progress value={progress} />
                <div className="mr-[.6vw] flex items-center justify-end gap-[0.3vw]">
                  <CoinDollarIcon
                    variant="dark"
                    className="w-[1.2vw] text-white/30"
                  />
                  <h1 className="text-[1vw] font-extrabold italic text-white/30">
                    {new Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    }).format(money)}
                  </h1>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-[1vh]">
        <h1 className="text-[1.3vw] font-extrabold italic text-white">
          TOTAL / <span className="italic text-success">$122.433</span>
        </h1>
        <Button
          className="mb-[.65vh] flex w-full items-center justify-center"
          variant="secondary"
          scale="sm"
        >
          <h1 className="text-[1.1vw] font-extrabold uppercase italic">
            COLECTEAZA
          </h1>
        </Button>
      </div>
    </div>
  );
};
