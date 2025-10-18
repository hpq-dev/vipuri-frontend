import { useCharacterCreatorStore } from "@/stores/apps";
import { CharacterSectionLayout } from "../components/Layout";
import { Range } from "../components/Range";
import { CHARACTER_CREATOR_APPEARANCE } from "../consts";

const Appearance = () => {
  const { appearanceOverlayValues, setAppearanceOverlayValue } =
    useCharacterCreatorStore();

  const dispatchAppearanceChange =
    (overlayId: number, kind: "opacity" | "model") => (value: number) => {
      setAppearanceOverlayValue(overlayId, kind, value);
    };

  const retrieveAppearanceOverlayValue = (
    overlayId: number,
    kind: "opacity" | "model"
  ) => {
    const fallbackValue = kind === "opacity" ? 100 : 0;
    return appearanceOverlayValues[overlayId]?.[kind] ?? fallbackValue;
  };

  return (
    <CharacterSectionLayout>
      <div className="flex w-full flex-col items-start justify-start">
        {Object.entries(CHARACTER_CREATOR_APPEARANCE).map(
          ([key, { label, overlayId, maxModelIndex }]) => (
            <div key={key} className="w-full">
              <div className="mt-[1vh] flex w-full items-center justify-center gap-[1vw]">
                <h1 className="text-[.8vw] font-extrabold italic text-white/60 uppercase">
                  {label}
                </h1>
                <div className="w-full rounded-[1vh] bg-dark-200 py-[0.2vh]" />
              </div>

              <Range
                title="Model"
                initialValue={retrieveAppearanceOverlayValue(
                  overlayId,
                  "model"
                )}
                onChange={dispatchAppearanceChange(overlayId, "model")}
                min={0}
                max={maxModelIndex}
              />

              <Range
                title="Opacitate"
                initialValue={retrieveAppearanceOverlayValue(
                  overlayId,
                  "opacity"
                )}
                onChange={dispatchAppearanceChange(overlayId, "opacity")}
                min={0}
                max={100}
              />
            </div>
          )
        )}
      </div>
    </CharacterSectionLayout>
  );
};

export default Appearance;
