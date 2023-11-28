import React, { useEffect, useState } from 'react';

const Mixer = () => {
    const [volume1, setVolume1] = useState(1);
    const [volume2, setVolume2] = useState(0.1);

    // const audio1 = new Audio('audio/f.mp3');
    // const audio2 = new Audio('audio/s.mp3');
    const audio1 = new Audio('https://dm0qx8t0i9gc9.cloudfront.net/previews/audio/SiX0YRGyPkccxaman/audioblocks-background-beat-60-sec_HUgx2kFDo_NWM.mp3?type=preview&origin=AUDIOBLOCKS&timestamp_ms=1701131920367&publicKey=34acan3LytGU0uHTGfeRAvwOEkvEWmyRrBu34gNyRJmOwP2QMPU62mzFr5zKdmur&organizationId=106979&apiVersion=2.0&stockItemId=347300457&resolution=&endUserId=7f903380050cf7c47cbbe711fe85aa413ee94795&projectId=65653066d2d6a82b89bdfd6b&searchId=6efc5b81-c13f-4ede-a3f6-457f01281b11&searchPageId=c1091281-53c1-43ba-8d7c-5d7727b7b455');
    const audio2 = new Audio('https://tracks.melod.ie/track_versions/1419/MEL169_09_1_The_Quirky_Kid_%28Full%29_Luna_Pan.mp3?1632618839');

    const playAudio = (audio, volume, startTime) => {
        audio.pause();
        audio.currentTime = startTime || 0;
        audio.volume = volume;
        audio?.play();
    };

    const handleVolumeChange1 = (e) => {
        setVolume1(Number(e.target.value));
    };

    const handleVolumeChange2 = (e) => {
        setVolume2(Number(e.target.value));
    };

    const handlePlay = () => {
        playAudio(audio1, volume1, 0);
        playAudio(audio2, volume2, 30);
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
