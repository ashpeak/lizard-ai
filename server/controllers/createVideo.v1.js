const fs = require('fs');
const axios = require('axios');
const { join } = require("path");
const mediaHandler = require('../lib/mediaHandler');
const createVideo = require('../lib/videoshow');
const text2speech = require('../lib/text2speech');
const { mergeAudio } = require('../lib/ffmpeg');

const videoController = {};
const downloadPromises = [];


const downloadMedia = async (url, ext, res) => {
    if (!url || url === '') {
        return res.status(400).send('Invalid parameters for one of the scenes');
    }

    // Make a GET request to the URL
    const response = await axios.get(url, { responseType: 'stream' });

    // Define the file path and name
    let fileName;
    if (ext === 'mp3') {
        fileName = `ashishTONY.${ext}`;
    } else {
        fileName = `ashishTONY${Date.now()}.${ext}`;
    }
    let filePath = join(process.cwd(), "uploads", fileName);

    // Create a write stream to save the file
    const writer = fs.createWriteStream(filePath);

    // Pipe the response stream to the write stream
    response.data.pipe(writer);

    // Create a promise for this download
    const downloadPromise = new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });

    // Add the promise to the array
    downloadPromises.push(downloadPromise);
}


videoController.createVideo = async (req, res) => {

    const { script, bgMusic } = req.body;
    try {

        // Iterate over each file in the request
        for (const scene of script) {
            const { image } = scene;
            // Download the image
            await downloadMedia(image, 'jpg', res);
        }

        await downloadMedia(bgMusic.preview, 'mp3', res);

        // Wait for all download promises to resolve
        await Promise.all(downloadPromises);

        // Send a success response
        res.status(200).send({ msg: "Video creation in progress" });


        const images = await mediaHandler.getAllImages('ashishTONY');

        for (const image of images) {
            await mediaHandler.resizeImage(image, 9 / 16);
        }

        const files = images.map(image => ({ path: `${process.cwd()}\\uploads\\${image}`, loop: 4 }));

        // Create the text to speech audio
        const text = 'There are many real-life examples of a stack. Consider the simple example of plates stacked over one another in a canteen. The plate which is at the top is the first one to be removed, i.e. the plate which has been placed at the bottommost position remains in the stack for the longest period of time. So, it can be simply seen to follow the LIFO/FILO order.';
        const speechAudio = await text2speech(text, '1234', '123');
        const speechAudioPath = join(process.cwd(), 'audioGenerated', speechAudio);

        const musicPath = join(process.cwd(), 'uploads', 'ashishTONY.mp3');
        const outputPath = join(process.cwd(), 'created', 'output.mp4');
        const subtitle = join(process.cwd(), 'test', 'subtitle.srt');

        // Combine the speech audio and bg music
        const merged_audio = await mergeAudio(speechAudioPath, musicPath, speechAudio);

        // Create the final video
        createVideo(files, merged_audio, subtitle, outputPath);

    } catch (error) {
        console.log(error);
    }
};

module.exports = videoController;