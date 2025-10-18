import { InfoIcon } from "@/utils/icons/dealership";
import { TextureCards } from "../textures/Cards";
import clsx from "clsx";

interface ICardProps {
  category: string;
  name: string;
  stock: number;
  price: number;
  image: string;
  isCenter?: boolean;
}

export const Card = (props: ICardProps) => {
  const { category, name, image, stock, price } = props;

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center",
        !props.isCenter && "brightness-[.3]"
      )}
    >
      <div className="flex items-start justify-start">
        <h1
          className={clsx(
            "absolute z-20 bg-white px-[.2vw] py-[.1vh] text-[.65vw] font-black uppercase",
            !props.isCenter ? "text-black/80" : "text-black"
          )}
        >
          {category}
        </h1>
        <div className="flex items-start justify-end">
          <div
            className={clsx(
              "absolute z-20 mr-[0.4vw] mt-[0.5vh] flex items-center justify-start gap-[0.3vw]",
              !props.isCenter ? "text-white/50" : "text-warning"
            )}
          >
            <h1 className="text-[.7vw] font-extrabold italic tracking-wide">
              {stock} STOCK
            </h1>
            <InfoIcon className="w-[.8vw]" />
          </div>
          <div className="relative flex w-[15vw] flex-col items-center justify-center overflow-hidden bg-dark-200 py-[1.5vh]">
            <div className="pointer-events-none absolute inset-0 z-0">
              <TextureCards />
            </div>
            <div className="relative z-10">
              <img src={image} alt="vehicle" className="mt-[2vh] w-[13vw]" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-between bg-dark-200 px-[0.5vw] py-[0.5vh]">
        <h1
          className={clsx(
            "text-[.7vw] font-bold italic uppercase",
            !props.isCenter ? "text-white/50" : "text-white"
          )}
        >
          {name}
        </h1>
        <h1
          className={clsx(
            "text-[.7vw] font-bold italic",
            !props.isCenter ? "text-white/50" : "text-success"
          )}
        >
          {formatMoney(price)}
        </h1>
      </div>
    </div>
  );
};
