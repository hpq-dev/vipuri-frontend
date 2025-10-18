import { CharacterSectionLayout } from "../components/Layout";
import { Assets } from "../components/Assets";
import { Icon } from "@iconify/react";
import { useCallback, useMemo, useState } from "react";
import { CHARACTER_CREATOR_CLOTHES } from "../consts";
import { useCharacterCreatorStore } from "@/stores/apps";
import { useGameEnvEffect } from "@/utils/hooks"; 
import { fromAsset } from "@/utils/helpers";
 

const Clothes = () => {
  const { selectedGender, cloth, setCloth } = useCharacterCreatorStore();

  const [activeCategory, setActiveCategory] =
    useState<keyof typeof CHARACTER_CREATOR_CLOTHES>("top");

  const [drawables, setDrawables] = useState<any[]>();

  const selectedCategory = useMemo(() => {
    return Object.entries(CHARACTER_CREATOR_CLOTHES).find(
      ([key]) => key === activeCategory,
    )?.[1];
  }, [activeCategory]);

  useGameEnvEffect(() => {
    if (!selectedCategory) return; 
  }, [selectedCategory]);

  const dispatchModelChange = useCallback(
    (drawable: number) => {
      if (!selectedCategory) return;
      setCloth(selectedCategory.componentId, drawable);
    },
    [selectedCategory, setCloth],
  );

  return (
    <CharacterSectionLayout>
      <div className="my-[2vh] flex w-full items-center justify-center gap-[0.5vw] rounded-[1vh] bg-dark-200 px-[0.3vw] py-[0.5vh]">
        {Object.entries(CHARACTER_CREATOR_CLOTHES).map(([key, { icon }]) => (
          <button
            key={key}
            onClick={() =>
              setActiveCategory(key as keyof typeof CHARACTER_CREATOR_CLOTHES)
            }
            className={`flex w-full items-center justify-center gap-1 rounded-[.5vh] py-[.8vh] text-[.7vw] font-extrabold uppercase italic tracking-wide transition ${
              activeCategory === key
                ? "bg-primary text-white"
                : "bg-dark-200 text-white/70 hover:bg-primary hover:text-white"
            } `}
          >
            <Icon icon={icon} className="pointer-events-none text-[1.2vw]" />
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center gap-[2vh]">
        <div className="flex w-full flex-col items-start justify-start gap-[1vh]">
          <div className="flex w-full items-center justify-center gap-[1vw]">
            <h1 className="text-[.8vw] font-extrabold italic text-white/60 uppercase">
              {selectedCategory?.label}
            </h1>
            <div className="w-full rounded-[1vh] bg-dark-200 py-[0.2vh]" />
          </div>
          <div className="grid max-h-[55vh] grid-cols-3 gap-x-[0.5vw] gap-y-[0.7vh] overflow-y-auto pr-[0.3vw] [&::-webkit-scrollbar-thumb]:rounded-[0.5vw] [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-track]:bg-dark-200 [&::-webkit-scrollbar]:w-[0.5vw]">
            {selectedCategory &&
              drawables
                ?.filter(
                  ({ gender }) => gender === null || gender === selectedGender,
                )
                ?.map(({ drawable, storageObject }, idx) => (
                  <Assets
                    key={idx}
                    image={fromAsset(storageObject.objectKey)}
                    id={drawable}
                    onClick={dispatchModelChange}
                    isSelected={
                      cloth[selectedCategory.componentId] === drawable
                    }
                  />
                ))}
          </div>
        </div>
      </div>
    </CharacterSectionLayout>
  );
};

export default Clothes;
