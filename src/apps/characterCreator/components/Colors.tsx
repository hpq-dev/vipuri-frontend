import { colors } from "../utils/colors";

export const Colors = () => {
  return (
    <div className="z-20 mt-[1vh] flex w-full flex-col items-start justify-start gap-[1.5vh]">
      <div className="flex w-full items-center justify-start gap-[0.7vw]">
        <h1 className="text-[.9vw] font-extrabold italic text-white/60">
          COLORS
        </h1>
        <div className="w-full bg-dark-200 px-[.5vw] py-[.25vh]"></div>
      </div>
      <div className="grid grid-cols-11 items-start justify-start gap-[0.24vw]">
        {colors.map((color, index) => (
          <div key={index} className="flex items-center justify-center">
            <div
              onClick={() => {}}
              className="flex cursor-pointer items-center justify-center border-[0.5vh] border-dark-200 px-[0.5vw] py-[0.9vh]"
              style={{ backgroundColor: color }}
            ></div>
            {/* {storeKitStore.selectedColor === index && (
              <div className="pointer-events-none absolute h-[1.1vh] w-[0.5vw] rounded-[50vh] bg-white"></div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};
