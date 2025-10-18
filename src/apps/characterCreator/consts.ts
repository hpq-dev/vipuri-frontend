import type {
  CharacterCreatorGender,
  CharacterCreatorParent,
} from "@/stores/apps";
import { fromAsset } from "@/utils/helpers";

export const CHARACTER_CREATOR_PARENT_START_OFFSETS = {
  male: Array.from({ length: 21 - 0 + 1 }, (_, i) => 0 + i),
  female: Array.from({ length: 41 - 24 + 1 }, (_, i) => 24 + i),
} as const satisfies Record<CharacterCreatorGender, number[]>;

export const CHARACTER_CREATOR_PARENTS = (gender: CharacterCreatorGender) =>
  ({
    mother: {
      label: "Mother",
      shapes: CHARACTER_CREATOR_PARENT_START_OFFSETS[gender].map((id, idx) => ({
        id,
        image: fromAsset(
          `character-creator/parents/mother/parent_female_${idx}.png`,
        ),
      })),
    },
    father: {
      label: "Father",
      shapes: CHARACTER_CREATOR_PARENT_START_OFFSETS[gender].map((id, idx) => ({
        id,
        image: fromAsset(
          `character-creator/parents/father/parent_male_${idx}.png`,
        ),
      })),
    },
  }) as const satisfies Record<CharacterCreatorParent, unknown>;

export const CHARACTER_CREATOR_FACE_FEATURES = {
  eyes: {
    icon: "bytesize:eye",
    items: [
      {
        label: "Sprâncene",
        ranges: [
          { label: "Înălțimea", index: 6 },
          { label: "Lățimea", index: 7 },
        ],
      },
      {
        label: "Ochi",
        ranges: [{ label: "Mărimea", index: 11 }],
      },
    ],
  },
  nose: {
    icon: "mingcute:nose-line",
    items: [
      {
        label: "Nas",
        ranges: [
          { label: "Lățimea", index: 0 },
          { label: "Înălțimea", index: 1 },
          { label: "Lungimea", index: 2 },
          { label: "Lățimea pod", index: 3 },
          { label: "Unghiul nasului", index: 4 },
          { label: "Vârful nasului", index: 5 },
        ],
      },
    ],
  },
  face: {
    icon: "mingcute:face-line",
    items: [
      {
        label: "Pomeți",
        ranges: [
          { label: "Lățimea pomeților", index: 8 },
          { label: "Înălțimea pomeților", index: 9 },
        ],
      },
      {
        label: "Obraji",
        ranges: [{ label: "Lățimea obrajilor", index: 10 }],
      },
    ],
  },
  lips: {
    icon: "streamline:mouth-lip-remix",
    items: [
      {
        label: "Buze",
        ranges: [{ label: "Mărimea", index: 12 }],
      },
    ],
  },
  beard: {
    icon: "fluent-emoji-high-contrast:man-beard",
    items: [
      {
        label: "Maxilar",
        ranges: [
          { label: "Lățimea", index: 13 },
          { label: "Forma", index: 18 },
        ],
      },
      {
        label: "Bărbie",
        ranges: [
          {
            label: "Înălțimea",
            index: 15,
          },
          {
            label: "Adâncimea",
            index: 16,
          },
          {
            label: "Lățimea",
            index: 17,
          },
          {
            label: "Indentarea",
            index: 14,
          },
        ],
      },
    ],
  },
} as const satisfies Record<
  string,
  {
    icon: string;
    items: {
      label: string;
      ranges: { label: string; index: number }[];
    }[];
  }
>;

export const CHARACTER_CREATOR_APPEARANCE = [
  {
    label: "Pete",
    overlayId: 0,
    maxModelIndex: 23,
  },
  {
    label: "Îmbătrânire",
    overlayId: 3,
    maxModelIndex: 14,
  },
  {
    label: "Ten",
    overlayId: 6,
    maxModelIndex: 11,
  },
  {
    label: "Daune Solare",
    overlayId: 7,
    maxModelIndex: 10,
  },
  {
    label: "Alunițe",
    overlayId: 9,
    maxModelIndex: 17,
  },
] as const satisfies Array<{
  label: string;
  overlayId: number;
  maxModelIndex: number;
}>;

export const CHARACTER_CREATOR_COSMETICS = {
  hair: {
    label: "Păr",
    allowedGender: ["male", "female"],
    maxModelIndex: {
      male: 82,
      female: 86,
    },
  },
  eyebrows: {
    label: "Sprâncene",
    allowedGender: ["male", "female"],
    maxModelIndex: 33,
  },
  beard: {
    label: "Barbă",
    allowedGender: ["male"],
    maxModelIndex: 28,
  },
} as Record<
  string,
  {
    label: string;
    allowedGender: CharacterCreatorGender[];
    maxModelIndex: Record<CharacterCreatorGender, number> | number;
    overlayId?: number;
  }
>;

export const CHARACTER_CREATOR_CLOTHES = {
  top: {
    label: "Tricou",
    icon: "raphael:tshirt",
    componentId: 11,
  },
  undershirt: {
    label: "Undershirt",
    icon: "streamline-sharp:shirt-solid",
    componentId: 8,
  },
  legs: {
    label: "Pantaloni",
    icon: "ph:pants-duotone",
    componentId: 4,
  },
  shoes: {
    label: "Încălțăminte",
    icon: "hugeicons:running-shoes",
    componentId: 6,
  },
} as const satisfies Record<
  string,
  {
    label: string;
    icon: string;
    componentId: number;
  }
>;
