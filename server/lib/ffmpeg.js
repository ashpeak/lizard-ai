const ffmpegPath = require('ffmpeg-static');
const ffprobePath = require('ffprobe-static').path;
const ffmpeg = require('fluent-ffmpeg');
const { join } = require("path");
const { unlink } = require("fs").promises;

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const myFFmpeg = {};


myFFmpeg.mergeAudio = (audio1, audio2, name) => {
    return new Promise((resolve, reject) => {
        try {
            const volume1 = 1.0;
            const volume2 = 0.3;
            const startFrom = 5;
            const output = join(process.cwd(), "audioGenerated", `${name.split('.')[0]}_merged.mp3`);

            ffmpeg()
                .input(audio1)
                .input(audio2)
                .audioCodec('libmp3lame') // or choose the codec you prefer
                .outputOptions(`-filter_complex`, `[0:a]volume=${volume1}[a0];[1:a]atrim=start=${startFrom},volume=${volume2}[a1];[a0][a1]amix=inputs=2:duration=shortest[outa]`)
                .outputOptions('-map', '[outa]')
                .output(output)
                .on('end', () => {
                    resolve(output);

                    unlink(audio1);
                    unlink(audio2);
                })
                .on('error', (err) => {
                    reject(err);
                })
                .run();
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = myFFmpeg;