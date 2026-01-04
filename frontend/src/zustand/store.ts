import { create } from "zustand";

export type CurrentFeatureStore = {
  index: number;
  setIndex: (index: number) => void;
};

export const useCurrentFeatureStore = create<CurrentFeatureStore>((set) => ({
  index: 0,
  setIndex: (index) =>
    set((state) => ({
      index: index,
    })),
}));

export type CurrentInputUrlStore = {
  currentInputUrl: string;
  setCurrentInputUrl: (url: string) => void;
};

export const useCurrentInputUrlStore = create<CurrentInputUrlStore>((set) => ({
  currentInputUrl: "",
  setCurrentInputUrl: (url) =>
    set((state) => ({
      currentInputUrl: url,
    })),
}));
