import { create } from 'zustand';

export const settings = create((set) => ({
    music: 0.1,
    voiceover: 1,
    subtitlePosition: 5,
    setMusicVolume: (volume) => set({ music: volume }),
    setVoiceoverVolume: (volume) => set({ voiceover: volume }),
    setSubtitlePosition: (position) => set({ subtitlePosition: position })
}));