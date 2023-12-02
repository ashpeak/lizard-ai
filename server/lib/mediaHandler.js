const sharp = require('sharp');
const fs = require('fs/promises');
const { join } = require("path");

const mediaHandler = {};

mediaHandler.prepareImage = async (inputName, aspectRatio, script) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Define the input/output path
            const path = join(process.cwd(), 'uploads', inputName);

            // Read the image from the input path
            const imageBuffer = await fs.readFile(path);

            // Calculate the new height based on the desired aspect ratio
            const { width, height } = await sharp(imageBuffer).metadata();
            const newWidth = Math.round(height * aspectRatio);

            // Resize the image using sharp
            await sharp(imageBuffer)
                .resize({ width: newWidth, height: height, position: 'center' })
                .toFile(join(process.cwd(), 'uploads', inputName));

            ffmpeg()
                .input(inputPath)
                .input('./files/audio_merged.mp3')
                .input('./files/subtitle.srt')
                .inputFPS(1)
                .outputOptions('-vf', 'loop=loop=20,scale=720:1280,subtitles=./files/subtitle.srt:force_style=\'Fontsize=16\,Fontname=Nunito\,PrimaryColour=&Hffffff&\,Outline=1\,OutlineColour=&H000000&\,BackColour=&H000000&\,Bold=1\,MarginV=40\,MarginL=40\,MarginR=40\,MarginB=40\'', '-r', '24')
                .output('./welcome.mp4')
                .videoCodec('libx264')
                .audioCodec('aac')
                .outputOptions('-pix_fmt', 'yuv420p')
                .on('end', () => {
                    resolve();
                })
                .on('error', () => {
                    reject();
                })
                .run();
        } catch (error) {
            console.error('Error resizing image:', error);
            reject(error);
        }
    });
}

mediaHandler.getAllImages = async (prefix) => {
    try {
        const files = await fs.readdir(join(process.cwd(), 'uploads'));
        const matchingFiles = files.filter(file => file.startsWith(prefix) && file.endsWith('.jpg') || file.endsWith('.gif'));

        return matchingFiles;
    } catch (error) {
        console.error('Error finding files:', error);
        return [];
    }
}

module.exports = mediaHandler;

