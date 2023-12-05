const sharp = require('sharp');
const fs = require('fs/promises');
const { join } = require("path");
const ffmpegPath = require('ffmpeg-static');
const ffprobePath = require('ffprobe-static').path;
const ffmpeg = require('fluent-ffmpeg');
const { createSubtitle } = require('./subtitle');
const { unlink } = require("fs").promises;

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const mediaHandler = {};

const getVideoMetadata = (inputFilePath) => {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(inputFilePath, (err, metadata) => {
            if (err) {
                reject(err);
            }
            const { height, width } = metadata.streams[0];
            resolve({ height, width });
        });
    });
};

const getAudioDuration = (inputFilePath) => {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(inputFilePath, (err, info) => {
            if (err) {
                reject(err);
            }
            const { duration } = info.streams[0];
            resolve(duration);
        });
    });
};

mediaHandler.prepareImage = async (scene, inputName, ext, aspectRatio) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Define the input/output path
            const path = join(process.cwd(), 'uploads', inputName + ext);
            const audioDuration = await getAudioDuration(join(process.cwd(), 'audioGenerated', `${inputName}.mp3`));

            // Read the image from the input path
            const imageBuffer = await fs.readFile(path);

            // Calculate the new height based on the desired aspect ratio
            const { height } = await sharp(imageBuffer).metadata();
            const newWidth = Math.round(height * aspectRatio);

            // Resize the image using sharp
            await sharp(imageBuffer)
                .resize({ width: newWidth, height: height, position: 'center' })
                .toFile(join(process.cwd(), 'uploads', inputName + ext));

            ffmpeg()
                .input(path)
                .input(join(process.cwd(), 'audioGenerated', `${inputName}.mp3`))
                // .input('./files/subtitle.srt')
                .inputFPS(1)
                // .outputOptions('-vf', 'loop=loop=20,scale=720:1280,subtitles=./files/subtitle.srt:force_style=\'Fontsize=16\,Fontname=Nunito\,PrimaryColour=&Hffffff&\,Outline=1\,OutlineColour=&H000000&\,BackColour=&H000000&\,Bold=1\,MarginV=40\,MarginL=40\,MarginR=40\,MarginB=40\'', '-r', '24')
                .outputOptions('-vf', 'loop=loop=20,scale=720:1280', '-r', '24', '-t', audioDuration, '-y')
                .output(join(process.cwd(), 'temp', `${inputName}.mp4`))
                .videoCodec('libx264')
                .audioCodec('aac')
                .outputOptions('-pix_fmt', 'yuv420p')
                .on('end', () => {
                    console.log('Finished processing', inputName + ext);
                    resolve();
                })
                .on('start', () => {
                    console.log('Started processing', inputName + ext);
                })
                .on('error', () => {
                    reject();
                })
                .run();
        } catch (error) {
            console.error('Error preparing media:', error);
            reject(error);
        }
    });
}

mediaHandler.prepareVideo = async (scene, inputName, ext, aspectRatio) => {

    const path = join(process.cwd(), 'uploads', inputName + ext);
    const audioDuration = await getAudioDuration(join(process.cwd(), 'audioGenerated', `${inputName}.mp3`));
    const { height, width } = await getVideoMetadata(path);
    const newWidth = Math.round(height * aspectRatio);
    const temp = Math.round((width - newWidth) / 2);
    const subtitlePath = await createSubtitle(scene.dialogue, inputName);

    return new Promise((resolve, reject) => {
        ffmpeg()
            .input(path)
            .input(join(process.cwd(), 'audioGenerated', `${inputName}.mp3`))
            .outputOptions('-vf', `crop=in_w-${temp}-${temp}:in_h,scale=720:1280,subtitles=${subtitlePath}`)
            // .outputOptions('-vf', `crop=in_w-${temp}-${temp}:in_h,subtitles=./files/subtitle.srt:force_style=\'Fontsize=16\,Fontname=Nunito\,PrimaryColour=&Hffffff&\,Outline=1\,OutlineColour=&H000000&\,BackColour=&H000000&\,Bold=1\,MarginV=40\,MarginL=40\,MarginR=40\,MarginB=40\'`)
            .outputOptions('-map', '0:v:0', '-map', '1:a:0', '-c:a', 'aac', '-c:v', 'libx264', '-t', audioDuration, '-pix_fmt', 'yuv420p', '-r', '24', '-b:v', '500k')
            .output(join(process.cwd(), 'temp', `${inputName}.mp4`))
            .on('end', () => {
                console.log('Finished processing', inputName + ext);
                resolve();
            })
            .on('start', () => {
                console.log('Started processing', inputName + ext);
            })
            .on('error', (err) => {
                console.error('Error:', err);
                reject(err);
            })
            .run();
    });
}

module.exports = mediaHandler;

