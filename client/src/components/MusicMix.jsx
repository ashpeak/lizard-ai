import { useEffect } from 'react';
import { FaMicrophone, FaPlayCircle } from "react-icons/fa";
import { FaStopCircle } from "react-icons/fa";
import { settings } from '../states/settings';

const voiceOverUri = (id) => {
    switch (id) {
        case 'guy-en':
            return 'http://res.cloudinary.com/dhfuu5omv/video/upload/v1704439350/bulbul/j9mhiogeymtcajabbsui.mp3';
        case 'jenny-en':
            return 'http://res.cloudinary.com/dhfuu5omv/video/upload/v1704439260/bulbul/ib8jji9oxk46xipjthwh.mp3';
        case 'ashish-en':
            return 'http://res.cloudinary.com/dhfuu5omv/video/upload/v1704439318/bulbul/u7xgvfsgcizzr9tqkzjj.mp3';
        case 'ashish-hi':
            return 'http://res.cloudinary.com/dhfuu5omv/video/upload/v1704439318/bulbul/u7xgvfsgcizzr9tqkzjj.mp3';
        case 'madhur-hi':
            return 'http://res.cloudinary.com/dhfuu5omv/video/upload/v1704439259/bulbul/yfvjxlotb9dzppq0zh2t.mp3';
        case 'swara-hi':
            return 'http://res.cloudinary.com/dhfuu5omv/video/upload/v1704439259/bulbul/bqkozr9kokbmt3ujhq6g.mp3';
        default:
            return 'http://res.cloudinary.com/dhfuu5omv/video/upload/v1704439350/bulbul/j9mhiogeymtcajabbsui.mp3';
    }
}

const Mixer = () => {
    const musicState = settings();
    const voiceover = musicState.voiceover;
    const bgMusic = musicState.music;
    const bgMusic_preview = musicState.bgMusic.preview;
    const voiceoverId = musicState.voiceoverModel.id;

    const audio1 = new Audio(voiceOverUri(voiceoverId));
    const audio2 = new Audio(bgMusic_preview);

    const playAudio = (audio, volume, startTime) => {
        audio.pause();
        audio.currentTime = startTime || 0;
        audio.volume = volume;
        audio?.play();
    };

    const handleVolumeChange1 = (e) => {
        musicState.setVoiceoverVolume(Number(e.target.value));
    };

    const handleVolumeChange2 = (e) => {
        musicState.setMusicVolume(Number(e.target.value));
    };

    const handlePlay = () => {
        playAudio(audio1, voiceover, 0);
        playAudio(audio2, bgMusic, 30);
    };

    const handleStop = () => {
        audio1.pause();
        audio2.pause();
    };

    const volumePercentage = (volume) => {
        let percentage = volume * 100;
        percentage = Math.round(percentage);
        return percentage;
    };

    useEffect(() => {

        const handleAudio1End = () => {
            // Pause both audios when audio1 ends
            audio1.pause();
            audio2.pause();
        };

        // Attach the event listener for audio1's 'ended' event
        audio1.addEventListener('ended', handleAudio1End);

        // Cleanup previous audio when the component unmounts or when music changes
        return () => {

            audio1.removeEventListener('ended', handleAudio1End);

            audio1.pause();
            audio2.pause();
        };
    }, [audio1, audio2]);

    return (
        <div className='w-full'>
            <div className='dark:bg-secondary-dark bg-secondary-light flex items-center opacity-70 pl-4 rounded-t-xl h-10'>
                <FaMicrophone className='text-text-light dark:text-text-dark' />
                <span className='ml-2 text-text-light dark:text-text-dark'>Volume Mix</span>
            </div>
            <div className='w-full flex flex-col gap-2 px-4 py-4'>
                <div className='w-full'>
                    <label className='flex justify-between'>
                        <span>Voiceover Volume</span>
                        <span>{volumePercentage(voiceover)}</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={voiceover}
                        onChange={handleVolumeChange1}
                        className='w-full h-2 bg-neutral-400 rounded-lg appearance-none cursor-pointer dark:bg-neutral-700'
                    />
                </div>

                <div className='w-full'>
                    <label className='flex justify-between'>
                        <span>Music Volume</span>
                        <span>{volumePercentage(bgMusic)}</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={bgMusic}
                        onChange={handleVolumeChange2}
                        className='w-full h-2 bg-neutral-400 rounded-lg appearance-none cursor-pointer dark:bg-neutral-700'
                    />
                </div>

                <div className='w-full mt-2 bg-neutral-200 dark:bg-neutral-800 h-[2px]'></div>

                <div className='flex justify-between items-center'>
                    <button onClick={handlePlay} className='flex items-center opacity-70 transition duration-150 hover:opacity-100'>
                        <FaPlayCircle />
                        <span className='ml-1'>Play</span>
                    </button>
                    <button onClick={handleStop} className='flex items-center opacity-70 transition duration-150 hover:opacity-100'>
                        <FaStopCircle />
                        <span className='ml-1'>Pause</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Mixer;