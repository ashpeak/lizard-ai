import ffmpegPath from "ffmpeg-static";
import { path as ffprobePath } from "ffprobe-static";
import ffmpeg from "fluent-ffmpeg";

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const files = [
    { path: 'sm.png', loop: 10 },
    { path: 'small.png', loop: 3 },
    { path: 'az.png', loop: 3 },
];

const imagePaths = ['sm.png', 'an.png', 'az.png'];
const outputVideoPath = 'output.mp4';

// Create a new ffmpeg command
const command = ffmpeg();

// Add input options for each image
imagePaths.forEach((imagePath, index) => {
    command.input(imagePath);
});

// Set the filter complex
command.complexFilter(
    [
        'scale=-2:720[rescaled]',
        {
            filter: 'crop',
            options: 'ih:ih:iw/4:0',
            inputs: 'rescaled',
            outputs: 'crop'
        },
        {
            filter: 'overlay',
            options: {
                x: '(main_w-overlay_w)/2',
                y: '(main_h-overlay_h)/2',
            },
            inputs: 'crop',
            outputs: 'output',
        },
    ],
    'output'
);

// Set the output video file
command.output(outputVideoPath).duration(5);

// Run the ffmpeg command
command.on('end', () => {
    console.log('Video created successfully');
})
    .on('error', (err) => {
        console.error('Error:', err);
    })
    .run();