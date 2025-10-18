import { isGameEnv } from "@/utils/helpers";
import { ArrowLeftIcon, ArrowRightIcon } from "@/utils/icons/dealership"; 
 

export const Controls = () => {
  const handleRotate = (direction: "left" | "right") => () => {
    if (!isGameEnv()) return; 
    return null;
  };

  const handleMouseUp = () => {
    if (!isGameEnv()) return; 
  };

  return (
    <div className="absolute top-[2vh] flex w-full items-center justify-center gap-[2vw]">
      <div
        className="flex cursor-pointer items-center justify-center gap-[0.3vw] transition hover:scale-95"
        onClick={handleRotate("left")}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <ArrowLeftIcon className="w-[1.1vw] text-warning" />
        <h1 className="text-[0.8vw] font-extrabold italic text-warning">
          ROTATE LEFT
        </h1>
      </div>
      <div
        className="flex cursor-pointer items-center justify-center gap-[0.3vw] transition hover:scale-95"
        onClick={handleRotate("right")}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <h1 className="text-[0.8vw] font-extrabold italic text-warning">
          ROTATE RIGHT
        </h1>
        <ArrowRightIcon className="w-[1.1vw] text-warning" />
      </div>
    </div>
  );
};
