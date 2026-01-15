import { create } from "zustand";

type StoreState = {
  dark: boolean;
  toggleDark: () => void;
};

export const useStore = create<StoreState>((set) => ({
  dark: false,
toggleDark: () =>
  set((state) => {
    return { dark: !state.dark };
  }),
}));
