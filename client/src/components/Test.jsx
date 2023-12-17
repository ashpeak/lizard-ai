import React, { useRef, useEffect, useState } from 'react';

const Mixer = () => {
    const mediaList = [
        { type: 'video', source: 'https://media4.giphy.com/media/2APBqVLI44TAS42eIh/giphy480p.mp4?cid=3d5c00b8nj49qsgkdku8ydkhfto0nqt05z02xkjxc2bs57jz&ep=v1_clips_trending&rid=giphy480p.mp4&ct=v' },
        // { type: 'image', source: 'https://images.pexels.com/videos/1409899/pictures/preview-0.jpg' },
        { type: 'video', source: 'https://player.vimeo.com/external/289258217.hd.mp4?s=5cf87d7670d96bbd2c110f4dc97fd5116f4468ad&profile_id=170&oauth2_token_id=57447761' },
        // Add more videos and images as needed
    ];

    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const mediaRef = useRef(null);
    const canvasRef = useRef(null);

    const playNextMedia = () => {
        setCurrentMediaIndex((prevIndex) => prevIndex + 1);
    };

    useEffect(() => {
        const mediaElement = mediaRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const playMedia = async () => {
            try {
                await mediaElement.play();
            } catch (error) {
                console.error('Error playing media:', error);
            }
        };

        const drawFrame = () => {
            context.drawImage(mediaElement, 0, 0, canvas.width, canvas.height);
            requestAnimationFrame(drawFrame);
        };

        mediaElement.addEventListener('ended', playNextMedia);

        playMedia();
        drawFrame();

        return () => {
            mediaElement.removeEventListener('ended', playNextMedia);
        };
    }, [currentMediaIndex]);

    const currentMedia = mediaList[currentMediaIndex];

    return (
        <div>
            <video ref={mediaRef} style={{ display: currentMedia.type === 'video' ? 'block' : 'none' }} controls>
                <source src={currentMedia.source} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <img
                ref={mediaRef}
                style={{ display: currentMedia.type === 'image' ? 'block' : 'none', width: '100%', height: 'auto' }}
                src={currentMedia.source}
                alt="The text"
            />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default Mixer;