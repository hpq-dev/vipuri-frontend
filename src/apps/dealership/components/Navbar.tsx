import { Controls } from './layout/Controls';
import { Header } from './layout/Header';
import { Money } from './layout/Money';

export const Navbar = () => {
  return (
    <div className="my-[3vh] flex w-full items-center justify-between">
      <Header />
      <div className="flex items-center w-full justify-center">
        <Controls />
        <Money />
      </div>

      <div className="absolute right-[1vw] top-[1.5vh]">
        <div className="flex items-center justify-center rounded-[.7vh] bg-error px-[.5vw] py-[.2vh]">
          <h1 className="mt-[.2vh] text-[.55vw] font-medium italic tracking-wide text-light">
            ESC
          </h1>
        </div>
      </div>
    </div>
  );
};
