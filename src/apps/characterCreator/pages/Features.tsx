import { CharacterSectionLayout } from "../components/Layout";
import { Range } from "../components/Range";
import { Icon } from "@iconify/react";
import { CHARACTER_CREATOR_FACE_FEATURES } from "../consts";
import { useState } from "react";
import { useCharacterCreatorStore } from "@/stores/apps";

const Features = () => {
  const { featureIndexValues, setFeatureIndexValue } =
    useCharacterCreatorStore();

  const [selectedCategory, setSelectedCategory] =
    useState<keyof typeof CHARACTER_CREATOR_FACE_FEATURES>("eyes");

  return (
    <CharacterSectionLayout>
      <div className="my-[2vh] flex w-full items-center justify-center gap-[0.5vw] rounded-[1vh] bg-dark-200 px-[0.3vw] py-[0.5vh]">
        {Object.entries(CHARACTER_CREATOR_FACE_FEATURES).map(
          ([key, { icon }]) => (
            <button
              key={key}
              onClick={() =>
                setSelectedCategory(
                  key as keyof typeof CHARACTER_CREATOR_FACE_FEATURES
                )
              }
              className={`flex w-full items-center justify-center rounded-[.5vh] py-[.8vh] text-[.7vw] font-extrabold uppercase italic tracking-wide transition ${
                selectedCategory === key
                  ? "bg-primary text-white"
                  : "bg-dark-200 text-white/70 hover:bg-primary hover:text-white"
              }`}
            >
              <Icon
                icon={icon}
                className="pointer-events-none text-[1.2vw] drop-shadow-[0_0_0.1vw_rgba(0,0,0,0.4)]"
              />
            </button>
          )
        )}
      </div>

      <div className="flex w-full flex-col items-start justify-start">
        {CHARACTER_CREATOR_FACE_FEATURES[selectedCategory].items.map(
          ({ label, ranges }) => (
            <div className="w-full">
              <div className="mt-[1vh] flex w-full items-center justify-center gap-[1vw]">
                <h1 className="text-[.8vw] font-extrabold italic text-white/60 uppercase">
                  {label}
                </h1>
                <div className="w-full rounded-[1vh] bg-dark-200 py-[0.2vh]" />
              </div>

              {ranges.map(({ label, index }) => (
                <Range
                  title={label}
                  initialValue={featureIndexValues[index] ?? 0}
                  onChange={(value) => setFeatureIndexValue(index, value)}
                  min={0}
                  max={100}
                />
              ))}
            </div>
          )
        )}
      </div>
    </CharacterSectionLayout>
  );
};

export default Features;
