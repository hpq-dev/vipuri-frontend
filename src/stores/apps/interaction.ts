import { create } from 'zustand';

interface IOptions {
  id: string;
  name: string;
  variant: 'primary' | 'dark' | 'secondary';
}

interface IInteractionStore {
  options: IOptions[];

  setOptions: (options: IOptions[]) => void;
}

export const useInteractionStore = create<IInteractionStore>(set => ({
  options: [
    { id: '1', name: 'Option 1', variant: 'primary' },
    { id: '2', name: 'Option 2', variant: 'dark' },
    { id: '3', name: 'Option 3', variant: 'dark' },
    { id: '4', name: 'Option 4', variant: 'dark' },
  ],

  setOptions: options => set({ options }),
}));
