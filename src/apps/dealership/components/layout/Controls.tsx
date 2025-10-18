import { ArrowLeftIcon, ArrowRightIcon } from "@/utils/icons/dealership"; 
import { isGameEnv } from "@/utils/helpers"; 
 

export const Controls = () => { 

  const handleVehicleRotate = (direction: "left" | "right") => () => {
    if (!isGameEnv()) return; 
  };

  const handleMouseUp = () => {
    if (!isGameEnv()) return; 
  };

  return (
    <div className="w-full absolute top-[3vh] left-0 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-[1.5vh]">
        <div className="flex items-center justify-center gap-[1vw]">
          <div
            onMouseDown={handleVehicleRotate("left")}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="flex cursor-pointer items-center justify-center gap-[0.5vw] text-warning transition hover:text-warning/80"
          >
            <ArrowLeftIcon className="w-[1.1vw]" />
            <h1 className="text-[0.8vw] font-bold italic">ROTATE LEFT</h1>
          </div>
          <div
            onMouseDown={handleVehicleRotate("right")}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="flex cursor-pointer items-center justify-center gap-[0.5vw] text-warning transition hover:text-warning/80"
          >
            <h1 className="text-[0.8vw] font-bold italic">ROTATE RIGHT</h1>
            <ArrowRightIcon className="w-[1.1vw]" />
          </div>
        </div>
        <div className="flex justify-center items-center gap-[0.5vw] max-w-[40vw] flex-wrap rounded-[1vh] bg-dark-300 px-[.4vw] py-[0.6vh]">
         
        </div>
      </div>
    </div>
  );
};
