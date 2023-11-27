import React, { useEffect, useState } from 'react';

const Mixer = () => {
    const [volume1, setVolume1] = useState(0.5);
    const [volume2, setVolume2] = useState(0.8);

    const audio1 = new Audio('./audio/f.mp3');
    const audio2 = new Audio('./audio/s.mp3');

    const playAudio = (audio, volume, startTime) => {
        audio.pause();
        audio.currentTime = startTime || 0;
        audio.volume = volume;
        audio.play();
    };

    const handleVolumeChange1 = (e) => {
        setVolume1(Number(e.target.value));
    };

    const handleVolumeChange2 = (e) => {
        setVolume2(Number(e.target.value));
    };

    const handlePlay = () => {
        playAudio(audio1, volume1, 0);
        playAudio(audio2, volume2, 10);
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
            audio1.src = '';
            audio2.pause();
            audio2.src = '';
        };
    }, [audio1, audio2]);

    return (
        <div className='w-80 flex flex-col gap-4'>
            <label>Audio File 1 Volume: {volumePercentage(volume1)}% &nbsp;</label>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume1}
                onChange={handleVolumeChange1}
            />

            <label>Audio File 2 Volume: {volumePercentage(volume2)}% &nbsp;</label>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume2}
                onChange={handleVolumeChange2}
            />

            <button onClick={handlePlay}>Play</button>
            <button onClick={handleStop}>Stop</button>
        </div>
    );
};

export default Mixer;
