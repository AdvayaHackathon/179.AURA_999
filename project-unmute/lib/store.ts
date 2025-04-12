import { create } from 'zustand';

type State = {
  defaultTab: number;
  setDefaultTab: (index: number) => void;
};

export const useAppStore = create<State>((set) => ({
  defaultTab: 0,
  setDefaultTab: (index) => set({ defaultTab: index }),
}));
