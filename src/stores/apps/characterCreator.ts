import { CHARACTER_CREATOR_PARENT_START_OFFSETS } from "@/apps/characterCreator/consts";
import { isGameEnv } from "@/utils/helpers"; 
import { create } from "zustand";

export type CharacterCreatorGender = "male" | "female";
export type CharacterCreatorParent = "mother" | "father";

export type CharacterCreatorPage =
  | "genetic"
  | "features"
  | "appearance"
  | "cosmetic"
  | "clothes";

interface ICharacterCreatorStore {
  page: CharacterCreatorPage;
  selectedGender: CharacterCreatorGender;
  selectedShape: Record<CharacterCreatorParent, number | null>;
  featureIndexValues: Record<number, number | null>;
  appearanceOverlayValues: Record<
    number,
    Partial<{ opacity: number; model: number }>
  >;
  cosmeticValues: Record<
    string,
    Partial<{ color: number; modelIndex: number }>
  >;
  cloth: Record<number, number>;

  reset(): void;

  setPage: (page: CharacterCreatorPage) => void;
  setSelectedGender: (gender: CharacterCreatorGender) => void;
  setSelectedShape: (
    parent: CharacterCreatorParent,
    shape: number | null,
  ) => void;
  setFeatureIndexValue: (index: number, value: number | null) => void;
  setAppearanceOverlayValue: (
    overlayId: number,
    kind: "opacity" | "model",
    value: number,
  ) => void;
  setCosmeticValue: (
    category: string,
    value: Partial<{ color: number; modelIndex: number }>,
  ) => void;
  setCloth: (componentNumber: number, drawable: number) => void;
}

export const useCharacterCreatorStore = create<ICharacterCreatorStore>()(
  (set, get) => ({
    page: "genetic",
    selectedGender: "male",
    selectedShape: {
      father: null,
      mother: null,
    },
    featureIndexValues: {},
    appearanceOverlayValues: {},
    cosmeticValues: {},
    cloth: {},

    reset() {
      const { selectedGender } = get();

      set({
        selectedShape: {
          father: CHARACTER_CREATOR_PARENT_START_OFFSETS[selectedGender][0],
          mother: CHARACTER_CREATOR_PARENT_START_OFFSETS[selectedGender][0],
        },
        featureIndexValues: {},
        appearanceOverlayValues: {},
        cosmeticValues: {},
        cloth: {},
      });
    },

    setPage: (page) => set({ page }),
    setSelectedGender: (gender) => {
      set({
        selectedGender: gender,
      });
    },
    setSelectedShape: (parent, shape) => {
      const { selectedShape } = get();
      set({
        selectedShape: {
          ...selectedShape,
          [parent]: shape,
        },
      });
    },
    setFeatureIndexValue: (index, value) => {
      const { featureIndexValues } = get();
      set({
        featureIndexValues: {
          ...featureIndexValues,
          [index]: value,
        },
      });
    },
    setAppearanceOverlayValue: (overlayId, kind, value) => {
      const { appearanceOverlayValues } = get();
      set({
        appearanceOverlayValues: {
          ...appearanceOverlayValues,
          [overlayId]: {
            ...appearanceOverlayValues[overlayId],
            [kind]: value,
          },
        },
      });
    },
    setCosmeticValue: (category, value) => {
      const { cosmeticValues } = get();
      set({
        cosmeticValues: {
          ...cosmeticValues,
          [category]: {
            ...cosmeticValues[category],
            ...value,
          },
        },
      });
    },
    setCloth(componentNumber, drawable) {
      const { cloth } = get();

      set({
        cloth: {
          ...cloth,
          [componentNumber]: drawable,
        },
      });
    },
  }),
);

if (isGameEnv()) { 

  
}
