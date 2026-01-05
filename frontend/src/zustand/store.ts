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

export type CurrentUrlStore = {
  currentInputUrl: string;
  currentResultUrl: string;
  setCurrentInputUrl: (url: string) => void;
  setCurrentResultUrl: (url: string) => void;
};

export const useCurrentUrlStore = create<CurrentUrlStore>((set) => ({
  currentInputUrl: "",
  currentResultUrl: "You will get the result url here.",

  setCurrentInputUrl: (url) =>
    set((state) => ({
      currentInputUrl: url,
    })),
  setCurrentResultUrl: (url) =>
    set((state) => ({
      currentResultUrl: url,
    })),
}));

export type ExtraInputFields = {
  password: string;
  dateAndTime: Date | string;
  renderer: boolean;
  setPassword: (password: string) => void;
  setDateAndTime: (dateAndTime: Date) => void;
  setRenderer: (val: boolean) => void;
};

export const useExtraInputFields = create<ExtraInputFields>((set) => ({
  password: "",
  dateAndTime: "",
  renderer: false,
  setPassword: (password) =>
    set((state) => ({
      password: password,
    })),
  setDateAndTime: (dateAndTime) =>
    set((state) => ({
      dateAndTime: dateAndTime,
    })),
  setRenderer: (val) =>
    set((state) => ({
      renderer: val,
    })),
}));
