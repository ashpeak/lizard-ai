import { create } from 'zustand';

export const settings = create((set) => ({
    music: 0.1,
    voiceover: 1,
    subtitlePosition: 5,
    bgMusic: {
        preview: '',
        name: ''
    },
    voiceoverModel: {
        name: 'Guy - English',
        id: 'guy-en'
    },
    setVoiceoverModel: (model) => set({ voiceoverModel: model }),
    setMusicVolume: (volume) => set({ music: volume }),
    setVoiceoverVolume: (volume) => set({ voiceover: volume }),
    setSubtitlePosition: (position) => set({ subtitlePosition: position }),
    setBgMusic: (bgMusic) => set({ bgMusic: bgMusic })
}));