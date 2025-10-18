import { CharacterSectionLayout } from "../components/Layout";
import { Assets } from "../components/Assets";
import {
  useCharacterCreatorStore,
  type CharacterCreatorGender,
  type CharacterCreatorParent,
} from "@/stores/apps";
import { CHARACTER_CREATOR_PARENTS } from "../consts";

const Genetic = () => {
  const { selectedGender, selectedShape, setSelectedGender, setSelectedShape } =
    useCharacterCreatorStore();

  const dispatchGenderChange = (gender: CharacterCreatorGender) => () => {
    setSelectedGender(gender);
  };

  const dispatchShapeChange =
    (parent: CharacterCreatorParent, shape: number | null) => () => {
      setSelectedShape(parent, shape);
    };

  return (
    <CharacterSectionLayout>
      <div className="my-[2vh] flex w-full items-center justify-center gap-[0.5vw] rounded-[1vh] bg-dark-200 px-[0.3vw] py-[0.5vh]">
        {(["male", "female"] as const).map((gender) => (
          <button
            key={gender}
            onClick={dispatchGenderChange(gender)}
            className={`w-full rounded-[.5vh] py-[.8vh] text-[.7vw] font-extrabold uppercase italic tracking-wide transition ${
              selectedGender === gender
                ? "bg-primary text-white"
                : "text-white/70 hover:bg-primary hover:text-white"
            }`}
          >
            <span className="italic drop-shadow-[0_0_0.1vw_rgba(0,0,0,0.4)] uppercase">
              {gender}
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center gap-[2vh]">
        <div className="flex flex-col items-start justify-start gap-[1vh]">
          {Object.entries(CHARACTER_CREATOR_PARENTS(selectedGender)).map(
            ([key, { label, shapes }]) => (
              <div key={key}>
                <div className="flex w-full items-center justify-center gap-[1vw]">
                  <h1 className="text-[.8vw] font-extrabold italic text-white/60">
                    {label}
                  </h1>
                  <div className="w-full rounded-[1vh] bg-dark-200 py-[0.2vh]" />
                </div>

                <div className="grid max-h-[27vh] grid-cols-3 gap-x-[0.5vw] gap-y-[0.7vh] overflow-y-auto pr-[0.3vw] [&::-webkit-scrollbar-thumb]:rounded-[0.5vw] [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-track]:bg-dark-200 [&::-webkit-scrollbar]:w-[0.5vw]">
                  {shapes.map((shape) => (
                    <Assets
                      id={shape.id}
                      image={shape.image}
                      onClick={dispatchShapeChange(
                        key as CharacterCreatorParent,
                        shape.id
                      )}
                      isSelected={
                        selectedShape[key as CharacterCreatorParent] ===
                        shape.id
                      }
                    />
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </CharacterSectionLayout>
  );
};

export default Genetic;
