const axios = require('axios');
const { join } = require("path");
const { createWriteStream } = require("fs");

const text2speech = async (text, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let headersList = {
                "Accept": "*/*",
                "origin": process.env.SPEECHIFY_ORIGIN,
                "referer": process.env.SPEECHIFY_ORIGIN,
                "sec-ch-ua": '"Microsoft Edge";v="119", "Chromium";v="119", "Not ? A_Brand";v="24"',
                "sec-ch-ua-platform": '"Windows"',
                "x-speechify-client": "Voiceovers Client",
                "x-speechify-client-version": "0.0.1",
                "x-speechify-synthesis-options": "sentence-splitting=false",
                "content-type": "application/json",
                "Authorization": `Bearer ${process.env.SPEECHIFY_AUTH_KEY}`
            }

            let bodyContent = JSON.stringify({ "ssml": `<speak>${text}</speak>`, "voice": { "name": "Jason", "engine": "azure", "language": "en-US" }, "forcedAudioFormat": "mp3" });

            let reqOptions = {
                url: process.env.SPEECHIFY_API_URL,
                method: "POST",
                headers: headersList,
                responseType: "stream",
                data: bodyContent,
            }

            let response = await axios.request(reqOptions);

            let filePath = join(process.cwd(), "audioGenerated", `${name}_speech.mp3`);

            const writeStream = createWriteStream(filePath);

            response.data.pipe(writeStream);

            // Handle errors
            writeStream.on('error', (err) => {
                console.error('Error writing to file:', err);
                reject(err);
            });

            // Listen for the 'finish' event to know when writing is complete
            writeStream.on('finish', () => {
                resolve(`${name}_speech.mp3`);
            });

        } catch (err) {
            console.log(err);
        }
    });
}

module.exports = text2speech;