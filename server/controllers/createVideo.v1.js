const fs = require('fs');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { join } = require("path");
const connectDB = require('../configs/db');
const Project = require('../models/Project');
const mediaHandler = require('../lib/mediaHandler');
const createVideo = require('../lib/videoshow');
const text2speech = require('../lib/text2speech');
const { mergeAudio } = require('../lib/ffmpeg');

const videoController = {};

const downloadMedia = async (url, name, ext, res) => {
    if (!url || url === '') {
        return res.status(400).send('Invalid parameters for one of the scenes');
    }

    // Make a GET request to the URL
    const response = await axios.get(url, { responseType: 'stream' });

    // Define the file path
    let filePath = join(process.cwd(), "uploads", `${name}.${ext}`);

    // Create a write stream to save the file
    const writer = fs.createWriteStream(filePath);

    // Pipe the response stream to the write stream
    response.data.pipe(writer);

    // Create a promise for this download
    const downloadPromise = new Promise((resolve, reject) => {
        writer.on('close', resolve);
        writer.on('error', reject);
    });

    // Add the promise to the array
    return downloadPromise;
}

const validateRequest = async (token, projectId) => {
    if (!token || !projectId) {
        return { isValid: false, id: null };
    }
    // Verify the token
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    if (!id) {
        return { isValid: false, id: null };
    }

    // Check if the user has access to the project
    await connectDB();
    const project = await Project.findOne({ _id: projectId, user: id });

    if (!project) {
        return { isValid: false, id: null };
    }

    return { isValid: true, id };
}


videoController.createVideo = async (req, res) => {

    const { token, id: projectId } = req.headers;
    let scriptDialogue = '';
    const downloadPromises = [];

    const { isValid, id } = await validateRequest(token, projectId);
    if (!isValid) {
        return res.status(400).send('Invalid request');
    }

    const { script, bgMusic } = req.body;
    try {

        // Iterate over each file in the request
        script.forEach((scene, index) => {
            const { image, dialogue } = scene;
            const name = id + projectId + index;
            scriptDialogue += dialogue;
            // Download the image
            downloadPromises.push(downloadMedia(image, name, 'jpg', res));
        });

        // Download background music
        downloadPromises.push(downloadMedia(bgMusic.preview, id + projectId + '_bg', 'mp3', res));

        // Wait for all download promises to resolve
        await Promise.all(downloadPromises);

        // Send a success response
        res.status(200).send({ msg: "Video creation in progress" });

        const images = await mediaHandler.getAllImages(id + projectId);

        // for (const image of images) {
        //     await mediaHandler.prepareImage(image, 9 / 16);
        // }
        // script.forEach((scene, index) => {
        //     const name = id + projectId + index;
        //     mediaHandler.prepareImage(name + '.jpg', 9 / 16);
        // });

        const files = images.map(image => ({ path: `${process.cwd()}\\uploads\\${image}`, loop: 4 }));

        // Create the text to speech audio
        const speechAudio = await text2speech(scriptDialogue, id + projectId);
        const speechAudioPath = join(process.cwd(), 'audioGenerated', speechAudio);

        const musicPath = join(process.cwd(), 'uploads', `${id}${projectId}_bg.mp3`);
        const outputPath = join(process.cwd(), 'created', `${id}${projectId}_created.mp4`);
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