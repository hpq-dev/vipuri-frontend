import { useCharacterCreatorStore } from "@/stores/apps";
import { CharacterSectionLayout } from "../components/Layout";
import { Range } from "../components/Range";
import { CHARACTER_CREATOR_COSMETICS } from "../consts";
import { colors } from "../utils/colors";

const Cosmetic = () => {
  const { selectedGender, cosmeticValues, setCosmeticValue } =
    useCharacterCreatorStore();

  const dispatchCosmeticValueChange =
    (category: string, kind: "color" | "modelIndex") => (value: number) => {
      setCosmeticValue(category, { [kind]: value });
    };

  const retrieveCosmeticValue = (
    category: string,
    kind: "color" | "modelIndex"
  ) => {
    return cosmeticValues?.[category]?.[kind] as number | undefined;
  };

  return (
    <CharacterSectionLayout>
      <div className="flex w-full flex-col items-start justify-start">
        {Object.entries(CHARACTER_CREATOR_COSMETICS)
          .filter(([, { allowedGender }]) =>
            allowedGender.includes(selectedGender)
          )
          .map(([key, { label, maxModelIndex }], idx) => (
            <div key={idx} className="mb-[2vh] w-full">
              <div className="mb-[1vh] mt-[1vh] flex w-full items-center justify-center gap-[1vw]">
                <h1 className="text-[.8vw] font-extrabold italic text-white/60 uppercase">
                  {label}
                </h1>
                <div className="w-full rounded-[1vh] bg-dark-200 py-[0.2vh]" />
              </div>

              <Range
                title="Model"
                onChange={dispatchCosmeticValueChange(key, "modelIndex")}
                initialValue={retrieveCosmeticValue(key, "modelIndex") ?? 0}
                min={0}
                max={
                  typeof maxModelIndex === "number"
                    ? maxModelIndex
                    : maxModelIndex[selectedGender]
                }
              />

              <div className="mt-[1.5vh]">
                <h1 className="mb-[.5vh] text-[.8vw] font-extrabold italic text-white/60 uppercase">
                  Culoarea {label}
                </h1>
                <div className="grid grid-cols-11 items-start justify-start gap-[0.24vw]">
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      className="relative flex items-center justify-center"
                    >
                      <div
                        onClick={() => {
                          dispatchCosmeticValueChange(key, "color")(index);
                        }}
                        className="flex cursor-pointer items-center justify-center border-[0.5vh] border-dark-200 px-[0.5vw] py-[0.9vh]"
                        style={{ backgroundColor: color }}
                      ></div>
                      {retrieveCosmeticValue(key, "color") === index && (
                        <div className="pointer-events-none absolute h-[1.1vh] w-[0.5vw] rounded-[50vh] bg-white"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </CharacterSectionLayout>
  );
};

export default Cosmetic;
