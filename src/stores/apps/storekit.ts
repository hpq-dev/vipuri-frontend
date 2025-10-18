import { create } from 'zustand';
import cloth_img from '@/apps/storekit/assets/cloth.png';

export interface IStoreKitCard {
  image: string;
  title: string;
  price: number;
}

interface IFilters {
  id: number;
  name: string;
}

interface IStoreKitState {
  category: 'CLOTHES' | 'TATTOOS' | 'HAIRSTYLES';
  categoryData: {
    identifier: 'CLOTHES' | 'TATTOOS' | 'HAIRSTYLES';
    name: string;
    description: string;
    color: string;
  }[];
  filters: IFilters[];
  cards: IStoreKitCard[];
  selectedCard: IStoreKitCard | null;
  selectedFilter: number;
  selectedColor: number;

  setSelectedCard: (card: IStoreKitCard | null) => void;
  setSelectedColor: (color: number) => void;
  setCards: (cards: IStoreKitCard[]) => void;
  setFilters: (filters: IFilters[]) => void;
  setSelectedFilter: (id: number) => void;
}

export const useStoreKitStore = create<IStoreKitState>(set => ({
  category: 'CLOTHES',
  categoryData: [
    {
      identifier: 'CLOTHES',
      name: 'CLOTHES',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      color: 'bg-secondary',
    },
    {
      identifier: 'HAIRSTYLES',
      name: 'HAIR STYLE',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      color: 'bg-warning',
    },
    {
      identifier: 'TATTOOS',
      name: 'TATTOO',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      color: 'bg-error',
    },
  ],
  filters: [
    { id: 1, name: 'FILTRE' },
    { id: 2, name: 'FILTRE' },
    { id: 3, name: 'FILTRE' },
    { id: 4, name: 'FILTRE' },
    { id: 5, name: 'FILTRE' },
    { id: 6, name: 'FILTRE' },
    { id: 7, name: 'FILTRE' },
    { id: 8, name: 'FILTRE' },
  ],
  cards: [
    {
      image: cloth_img,
      title: 'Cloth',
      price: 2000,
    },
    {
      image: cloth_img,
      title: 'Cloth',
      price: 2000,
    },
    {
      image: cloth_img,
      title: 'Cloth',
      price: 2000,
    },
    {
      image: cloth_img,
      title: 'Cloth',
      price: 2000,
    },
    {
      image: cloth_img,
      title: 'Cloth',
      price: 2000,
    },
    {
      image: cloth_img,
      title: 'Cloth',
      price: 2000,
    },
    {
      image: cloth_img,
      title: 'Cloth',
      price: 2000,
    },
    {
      image: cloth_img,
      title: 'Cloth',
      price: 2000,
    },
    {
      image: cloth_img,
      title: 'Cloth',
      price: 2000,
    },
    {
      image: cloth_img,
      title: 'Cloth',
      price: 2000,
    },
    {
      image: cloth_img,
      title: 'Cloth',
      price: 2000,
    },
    {
      image: cloth_img,
      title: 'Cloth',
      price: 2000,
    },
    {
      image: cloth_img,
      title: 'Cloth',
      price: 2000,
    },
  ],
  selectedCard: null,
  selectedFilter: 2,
  selectedColor: -1,

  setSelectedFilter: id => set({ selectedFilter: id }),
  setSelectedCard: card => set({ selectedCard: card }),
  setSelectedColor: color => set({ selectedColor: color }),
  setFilters: filters => set({ filters }),
  setCards: cards => set({ cards }),
}));
