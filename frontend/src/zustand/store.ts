import { create } from 'zustand'

export type CurrentFeatureStore = {
    title: string;
    description: string;
    index: number;
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    setIndex: (index: number) => void;
};

export const useCurrentFeatureStore = create<CurrentFeatureStore>((set)=>({
    index: 0,
    title: "shorten url",
    description: "Enter your url to shorten it",
    setTitle: (title) => set((state)=>({
        title: title
    })),
    setDescription: (description) => set((state)=>({
        description: description
    })),
    setIndex: (index) => set((state)=>({
        index: index
    }))
}))
