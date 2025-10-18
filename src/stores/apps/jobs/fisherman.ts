import { create } from 'zustand';

export type FishRarity = 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';

export interface FishData {
  kg: number;
  rarity: FishRarity;
  name: string;
  image: string;
}

interface FishermanState {
  type: 'bar' | 'fish';
  fishData: FishData | null;
  totalFish?: number;
  totalMoney?: number;

  setTotalFish?: (total: number) => void;
  setTotalMoney?: (total: number) => void;
  setType: (type: 'bar' | 'fish') => void;
  setFishData: (data: FishData) => void;
  resetFish: () => void;
}

export const useFishermanStore = create<FishermanState>(set => ({
  type: 'bar',
  fishData: null,
  totalFish: 0,
  totalMoney: 0,

  setTotalFish: total => set({ totalFish: total }),
  setTotalMoney: total => set({ totalMoney: total }),
  setType: type => set({ type }),
  setFishData: data => set({ fishData: data }),
  resetFish: () => set({ fishData: null, type: 'bar' }),
}));
