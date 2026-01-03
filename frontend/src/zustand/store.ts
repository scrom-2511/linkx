import { create } from 'zustand'

export type CurrentFeatureStore = {
    title: string,
    description: string,
    index: number
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    setIndex: (index: number) => void;
};


