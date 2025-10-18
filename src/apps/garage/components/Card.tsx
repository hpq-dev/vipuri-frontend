import { useGarageStore, type IGarageVehicle } from "@/stores/apps";
import { StarIcon } from "@/utils/icons/garage";
import { Texture } from "../texture";
import clsx from "clsx";
import { isGameEnv } from "@/utils/helpers"; 
import { useCallback } from "react";
 
export const Card: React.FC<IGarageVehicle> = (props) => {
  const {
    setSelectedVehicle,
    selectedVehicle,
    addVehicleToFavorite,
    removeVehicleFromFavorite,
  } = useGarageStore();

  const handleFavoriteToggle = useCallback(() => {
    if (!isGameEnv()) return;
    if (!props.isFavorite) { 
      addVehicleToFavorite(props.id);
    } else { 
      removeVehicleFromFavorite(props.id);
    }
  }, [
    props.id,
    props.isFavorite,
    addVehicleToFavorite,
    removeVehicleFromFavorite,
  ]);

  return (
    <div
      onClick={() => setSelectedVehicle(props.id)}
      className="flex cursor-pointer flex-col items-center justify-center transition hover:scale-95"
    >
      <div className="relative flex w-[15vw] flex-col items-center justify-center overflow-hidden rounded-t-[1.5vh] bg-dark-200 px-[.5vw] py-[.7vh]">
        <Texture className="pointer-events-none inset-0 z-0" />
        <div className="relative z-10 flex w-full items-center justify-between">
          <div className="flex items-center justify-start gap-[0.5vw]">
            
          </div>
          <div
            onClick={handleFavoriteToggle}
            className={clsx(
              "flex cursor-pointer items-center justify-center rounded-[2vh] px-[0.4vw] py-[0.7vh] transition",
              props.isFavorite
                ? "bg-yellow-400 text-dark-300 hover:bg-yellow-400/80"
                : "bg-dark-100 text-white hover:bg-yellow-400 hover:text-dark-300"
            )}
          >
            <StarIcon className="w-[1vw]" />
          </div>
        </div>
        {/* <img src={image} alt={name} className="relative z-10 w-[12vw]" /> */}
      </div>
      <div
        className={clsx(
          "flex w-full items-center justify-center rounded-b-[1.5vh] px-[.5vw] py-[.7vh]",
          selectedVehicle?.id === props.id ? "bg-primary" : "bg-dark-400"
        )}
      >
        <h1 className="text-[1vw] font-extrabold uppercase italic text-white">
          {props.model.name}
        </h1>
      </div>
    </div>
  );
};
