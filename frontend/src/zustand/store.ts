import { create } from 'zustand'

export type CurrentFeatureStore = {
    index: number;
    setIndex: (index: number) => void;
};

export const useCurrentFeatureStore = create<CurrentFeatureStore>((set)=>({
    index: 0,
    setIndex: (index) => set((state)=>({
        index: index
    }))
}))
