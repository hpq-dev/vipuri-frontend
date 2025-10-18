import { useFishshopStore } from "@/stores/apps";
import thumbnail_img from "./assets/thumbnail.png";
import { Missions } from "./components/Missions";
import { SellFish } from "./components/SellFish";
import { FishList } from "./components/FishList";
import { FishStore } from "./components/FishStore";

export const FisherShop = () => {
  const fishershopStore = useFishshopStore();
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div
        className="h-[85vh] w-[70vw] overflow-hidden rounded-[.8vh] shadow-lg"
        style={{
          backgroundImage: `linear-gradient(to top, #262626 50%, rgba(53,53,53,0) 100%), url(${thumbnail_img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="h-full w-full bg-black/50 px-[1vw] py-[2vh]">
          <div className="flex h-full w-full flex-col items-start justify-center gap-[5vh]">
            <div className="flex w-full items-start justify-between">
              <div className="flex flex-col items-start justify-start gap-[0.5vh]">
                <div className="flex items-center justify-start gap-[0.7vw]">
                  <h1 className="text-[1.3vw] font-extrabold uppercase italic text-white">
                    Pescar
                  </h1>
                  <div className="flex rotate-[6deg] items-center justify-center bg-white px-[0.3vw] py-[0.1vh]">
                    <h1 className="text-[1vw] font-black uppercase text-dark-400">
                      NPC
                    </h1>
                  </div>
                </div>
                <p className="w-1/2 text-start text-[.6vw] font-medium leading-[1.2] text-white/80">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
              <h1 className="rounded-[.5vh] bg-error px-[0.5vw] py-[0.3vh] text-[.7vw] font-semibold italic text-white">
                ESC
              </h1>
            </div>
            <div className="flex h-full w-full items-center justify-center gap-[0.5vw]">
              <div className="flex h-full w-full flex-col items-start justify-start">
                {fishershopStore.page === "home" ? (
                  <div className="flex h-full w-full items-start justify-between gap-[1vw] pl-[.6vw]">
                    <Missions />
                    <SellFish />
                  </div>
                ) : fishershopStore.page === "fishlist" ? (
                  <FishList />
                ) : (
                  <FishStore />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
