import { create } from "zustand";

export type CurrentFeatureStore = {
  index: number;
  setIndex: (index: number) => void;
};

export const useCurrentFeatureStore = create<CurrentFeatureStore>((set) => ({
  index: 0,
  setIndex: (index) =>
    set(() => ({
      index: index,
    })),
}));

export type ResultUrl =
  | {
      type: "success";
      url: string;
    }
  | {
      type: "error";
      errorMessage: string;
    }
  | {
      type: "info";
      message: string;
    };

export type CurrentUrlStore = {
  currentInputUrl: string;
  currentResultUrl: ResultUrl;
  setCurrentInputUrl: (url: string) => void;
  setCurrentResultUrl: (data: ResultUrl) => void;
};

export const useCurrentUrlStore = create<CurrentUrlStore>((set) => ({
  currentInputUrl: "",
  currentResultUrl: {
    type: "success",
    color: "text-white",
    url: "You will get the modified link here.",
  },

  setCurrentInputUrl: (url) =>
    set({
      currentInputUrl: url,
    }),

  setCurrentResultUrl: (data) =>
    set({
      currentResultUrl: data,
    }),
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
    set(() => ({
      password: password,
    })),
  setDateAndTime: (dateAndTime) =>
    set(() => ({
      dateAndTime: dateAndTime,
    })),
  setRenderer: (val) =>
    set(() => ({
      renderer: val,
    })),
}));
