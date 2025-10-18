import texture from '../assets/texture.png';
import fish_img from '../assets/fish.png';

export const FishCard = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-[1vh]">
      <div
        className="relative flex w-[9vw] cursor-pointer flex-col items-center justify-center gap-[.5vh] rounded-[.7vh] px-[.7vw] py-[1.5vh] text-center"
        style={{
          backgroundImage: `url(${texture})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          aspectRatio: '16/9',
        }}
      >
        <div className="flex w-full flex-col items-center justify-center gap-[0.2vh]">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-[.7vw] font-extrabold italic text-white/40">
              24KG
            </h1>
            <div className="flex items-center justify-end gap-[0.3vw]">
              <h1
                className={`rounded-[.7vh] bg-secondary px-[0.4vw] py-[0.1vh] text-[.6vw] font-bold italic text-white`}
              >
                RARE
              </h1>
              <h1
                className={`rounded-[.7vh] bg-dark-100 px-[0.4vw] py-[0.1vh] text-[.6vw] font-bold italic text-white`}
              >
                1X
              </h1>
            </div>
          </div>
          <img
            src={fish_img}
            alt="fish"
            className="relative w-[9vw] flex-shrink-0 object-contain py-[1vh]"
          />
          <div className="mb-[1vh] flex flex-col items-center justify-center gap-[0.3vh]">
            <h1 className="text-[.8vw] font-extrabold italic text-white">
              TITLE
            </h1>
            <h1 className="relative w-full overflow-hidden text-ellipsis whitespace-nowrap bg-dark-100 px-[.3vw] py-[.2vh] text-[.8vw] font-extrabold text-success">
              $32.000
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
