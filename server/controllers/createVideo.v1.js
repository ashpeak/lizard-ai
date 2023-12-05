const fs = require('fs');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { join } = require("path");
const connectDB = require('../configs/db');
const Project = require('../models/Project');
const mediaHandler = require('../lib/mediaHandler');
const { createVideo } = require('../lib/ffmpeg');
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
    let extension = '';
    if (ext === "video") extension = "mp4";
    else if (ext === "image") extension = "jpg";
    else if (ext === "audio") extension = "mp3";

    let filePath = join(process.cwd(), "uploads", `${name}.${extension}`);

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
    const downloadPromises = [];

    const { isValid, id } = await validateRequest(token, projectId);
    if (!isValid) {
        return res.status(400).send('Invalid request');
    }

    const { script, bgMusic, volumeMix } = req.body;
    try {

        // Iterate over each file in the request
        script.forEach((scene) => {
            const { index, media, type, dialogue } = scene;
            const name = id + projectId + index;
            // Download the image
            // downloadPromises.push(downloadMedia(media, name, type, res));
            // downloadPromises.push(text2speech(dialogue, name));
        });

        // Download background music
        // downloadPromises.push(downloadMedia(bgMusic.preview, id + projectId + '_bg', 'audio', res));

        // Wait for all download promises to resolve
        await Promise.all(downloadPromises);

        // Send a success response
        res.status(200).send({ msg: "Video creation in progress" });

        for (const scene of script) {
            const name = id + projectId + scene.index;
            if (scene.type === 'image') {
                await mediaHandler.prepareImage(scene, name, '.jpg', 0.5625);
            } else if (scene.type === 'gif') {
                await mediaHandler.prepareImage(scene, name, '.gif', 0.5625);
            } else if (scene.type === 'video') {
                await mediaHandler.prepareVideo(scene, name, '.mp4', 0.5625);
            }
        }

        // Create the text to speech audio
        const musicPath = join(process.cwd(), 'uploads', `${id}${projectId}_bg.mp3`);
        const subtitle = join(process.cwd(), 'test', 'subtitle.srt');
        const outputPath = join(process.cwd(), 'created', `${id}${projectId}.mp4`);

        // Create the final video
        createVideo(script, id + projectId, musicPath, volumeMix, subtitle, outputPath);

    } catch (error) {
        console.log(error);
    }
};

module.exports = videoController;