import { Button } from '@/components/common';

export const AddToCart = () => {
  return (
    <div className="absolute bottom-[3vh] flex w-full items-center justify-center">
      <Button variant="primary">
        <div className="flex items-center justify-center gap-[0.7vw]">
          <span className="text-[1.1vw] italic">ADD TO CART</span>
          <div className="flex items-center justify-center bg-white px-[0.5vw] py-[0.1vh]">
            <h1 className="text-[.75vw] font-extrabold tracking-wide text-primary drop-shadow-none">
              ENTER
            </h1>
          </div>
        </div>
      </Button>
    </div>
  );
};
