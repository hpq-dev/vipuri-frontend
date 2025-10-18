import { PrimaryTexture } from '../textures/Primary';

export const Header = () => (
  <div className="flex max-w-[14vw] flex-col items-start justify-start gap-[1vh]">
    <div className="flex items-center justify-start">
      <div className="flex items-center justify-center">
        <PrimaryTexture />
        <h1 className="absolute mt-[0.1vh] bg-success px-[.5vw] py-[.0vh] text-[.9vw] font-black text-dark-300">
          NORMAL
        </h1>
      </div>
      <h1 className="absolute ml-[8vw] text-[1.4vw] font-black uppercase italic tracking-wider text-white">
        Dealership
      </h1>
    </div>
    <p className="ml-[2.4vw] w-full text-[.55vw] font-light text-light/60">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s,{' '}
    </p>
  </div>
);
