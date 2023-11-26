const sharp = require('sharp');
const fs = require('fs/promises');
const { join } = require("path");

const mediaHandler = {};

mediaHandler.resizeImage = async (inputName, aspectRatio) => {
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
    } catch (error) {
        console.error('Error resizing image:', error);
    }
}

mediaHandler.getAllImages = async (prefix) => {
    try {
        const files = await fs.readdir(join(process.cwd(), 'uploads'));
        const matchingFiles = files.filter(file => file.startsWith(prefix) && file.endsWith('.jpg'));

        return matchingFiles;
    } catch (error) {
        console.error('Error finding files:', error);
        return [];
    }
}

module.exports = mediaHandler;

