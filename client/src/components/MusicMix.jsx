import React, { useEffect } from 'react';
import { FaMicrophone, FaPlayCircle } from "react-icons/fa";
import { FaStopCircle } from "react-icons/fa";
import { settings } from '../states/settings';

const Mixer = () => {
    const musicState = settings();
    const voiceover = musicState.voiceover;
    const bgMusic = musicState.music;

    const audio1 = new Audio('/audio/ashish.mp3');
    const audio2 = new Audio('https://dm0qx8t0i9gc9.cloudfront.net/previews/audio/SiX0YRGyPkccxaman/audioblocks-background-beat-60-sec_HUgx2kFDo_NWM.mp3?type=preview&origin=AUDIOBLOCKS&timestamp_ms=1701131920367&publicKey=34acan3LytGU0uHTGfeRAvwOEkvEWmyRrBu34gNyRJmOwP2QMPU62mzFr5zKdmur&organizationId=106979&apiVersion=2.0&stockItemId=347300457&resolution=&endUserId=7f903380050cf7c47cbbe711fe85aa413ee94795&projectId=65653066d2d6a82b89bdfd6b&searchId=6efc5b81-c13f-4ede-a3f6-457f01281b11&searchPageId=c1091281-53c1-43ba-8d7c-5d7727b7b455');

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
            <div className='w-full flex flex-col gap-2 px-4 pt-4'>
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
                        className='w-full'
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
                        className='w-full'
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