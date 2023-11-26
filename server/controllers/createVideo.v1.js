const fs = require('fs');
const axios = require('axios');
const { join } = require("path");
const mediaHandler = require('../lib/mediaHandler');
const createVideo = require('../lib/videoshow');
const {exec} = require('child_process');

const videoController = {};
const downloadPromises = [];


const downloadMedia = async (url, ext) => {
    if (!url || url === '') {
        return res.status(400).send('Invalid parameters for one of the scenes');
    }

    // Make a GET request to the URL
    const response = await axios.get(url, { responseType: 'stream' });

    // Define the file path and name
    const fileName = `ashishTONY${Date.now()}.${ext}`;
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
            await downloadMedia(image, 'jpg');
        }

        // await downloadMedia(bgMusic.preview, 'mp3');

        // Wait for all download promises to resolve
        await Promise.all(downloadPromises);

        // Send a success response
        res.status(200).send({msg: "Video creation in progress"});


        const images = await mediaHandler.getAllImages('ashishTONY');

        for (const image of images) {
            await mediaHandler.resizeImage(image, 9 / 16);
        }

        const files = images.map(image => ({ path: `${process.cwd()}\\uploads\\${image}`, loop: 4 }));

        const musicPath = join(process.cwd(), 'uploads', 'ashishTONY1700897080962.mp3');
        const outputPath = join(process.cwd(), 'created', 'output.mp4');
        const subtitle = join(process.cwd(), 'uploads', 'subtitle.srt');
        createVideo(files, musicPath, subtitle, outputPath);

    } catch (error) {
        return res.status(500).json({ msg: "Internal server error!" });
    }
};

module.exports = videoController;