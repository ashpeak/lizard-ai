import { create } from 'zustand';

export const useLayerStore = create((set) => ({
    layer: null,
    setLayer: (layer) => set({ layer }),
}));