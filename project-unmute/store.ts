import { create } from 'zustand';

type AppState = {
  lastVisitedTab: number;
  setLastVisitedTab: (index: number) => void;
};

export const useAppStore = create<AppState>((set) => ({
  lastVisitedTab: 1, // Default to 'Games' tab
  setLastVisitedTab: (index) => set({ lastVisitedTab: index }),
}));
