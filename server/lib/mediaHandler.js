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

mediaHandler.prepareImage = async (scene, subtitlePosition, inputName, ext, aspectRatio) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Define the input/output path
            const path = join(process.cwd(), 'uploads', inputName + ext);
            const speechPath = join(process.cwd(), 'audioGenerated', `${inputName}.mp3`);
            const audioDuration = await getAudioDuration(speechPath);
            const subtitlePath = await createSubtitle(scene.dialogue, inputName);

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
                .input(speechPath)
                .inputFPS(1)
                .outputOptions('-vf', `loop=loop=20,scale=720:1280,subtitles=${subtitlePath}`, '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-c:v', 'libx264', '-r', '27', '-t', audioDuration, '-b:v', '4000k', '-b:a', '128k', '-y')
                .output(join(process.cwd(), 'temp', `${inputName}.mp4`))
                .on('end', () => {
                    console.log('Finished processing', inputName + ext);
                    unlink(path);
                    unlink(speechPath);
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

mediaHandler.prepareVideo = async (scene, subtitlePosition, inputName, ext, aspectRatio) => {

    const path = join(process.cwd(), 'uploads', inputName + ext);
    const speechPath = join(process.cwd(), 'audioGenerated', `${inputName}.mp3`);
    const audioDuration = await getAudioDuration(speechPath);
    const { height, width } = await getVideoMetadata(path);
    const newWidth = Math.round(height * aspectRatio);
    const temp = Math.round((width - newWidth) / 2);
    const subtitlePath = await createSubtitle(scene.dialogue, inputName);

    return new Promise((resolve, reject) => {
        ffmpeg()
            .input(path)
            .input(speechPath)
            .outputOptions('-vf', `crop=in_w-${temp}-${temp}:in_h,scale=720:1280,subtitles=${subtitlePath}`)
            .outputOptions('-map', '0:v:0', '-map', '1:a:0', '-c:a', 'aac', '-c:v', 'libx264', '-t', audioDuration, '-pix_fmt', 'yuv420p', '-r', '27', '-b:v', '4000k', '-b:a', '128k', '-strict', 'experimental')
            .output(join(process.cwd(), 'temp', `${inputName}.mp4`))
            .on('end', () => {
                console.log('Finished processing', inputName + ext);
                unlink(path);
                unlink(speechPath);
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

mediaHandler.prepareYoutube = async (scene, subtitlePosition, aspectRatio) => {

    const path = join(process.cwd(), 'uploads', scene.media);
    const speechPath = join(process.cwd(), 'audioGenerated', `${scene.media}.mp3`);
    const audioDuration = await getAudioDuration(speechPath);
    const { height, width } = await getVideoMetadata(path);
    const newWidth = Math.round(height * aspectRatio);
    const temp = Math.round((width - newWidth) / 2);
    const subtitlePath = await createSubtitle(scene.dialogue, scene.media);

    return new Promise((resolve, reject) => {
        ffmpeg()
            .input(path)
            .input(speechPath)
            .outputOptions('-vf', `crop=in_w-${temp}-${temp}:in_h,scale=720:1280,subtitles=${subtitlePath}`)
            .outputOptions('-map', '0:v:0', '-map', '1:a:0', '-c:a', 'aac', '-c:v', 'libx264', '-t', audioDuration, '-pix_fmt', 'yuv420p', '-r', '27', '-b:v', '4000k', '-b:a', '128k', '-strict', 'experimental')
            .output(join(process.cwd(), 'temp', `${scene.media}.mp4`))
            .on('end', () => {
                console.log('Finished processing', scene.media);
                unlink(speechPath);
                resolve();
            })
            .on('start', () => {
                console.log('Started processing', scene.media);
            })
            .on('error', (err) => {
                console.error('Error:', err);
                reject(err);
            })
            .run();
    });
}

module.exports = mediaHandler;

