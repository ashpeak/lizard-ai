const axios = require('axios');
const { join } = require("path");
const { createWriteStream } = require("fs");
const { pipeline } = require("stream");

const text2speech = async (text) => {
    try {
        let headersList = {
            "Accept": "*/*",
            "origin": "https://voiceover.speechify.com",
            "referer": "https://voiceover.speechify.com",
            "sec-ch-ua": '"Microsoft Edge";v="119", "Chromium";v="119", "Not ? A_Brand";v="24"',
            "sec-ch-ua-platform": '"Windows"',
            "x-speechify-client": "Voiceovers Client",
            "x-speechify-client-version": "0.0.1",
            "x-speechify-synthesis-options": "sentence-splitting=false",
            "content-type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJtQTdQQ1JMWWN0UWQ4bGFVdjJkOGQ5T21DdG0xIiwid29yZFF1b3RhIjo1MDAwLCJsYXN0V29yZFF1b3RhR3JhbnREYXRlIjoxNzAwOTE2MDcwLCJpYXQiOjE3MDA5MTYwNzAsImV4cCI6MTcwMTUyMDg3MH0.YMSC5asvdvp-k6Nx6yYg2bgyTbDAyINYPP82-ZTRiqo"
            // "Authorization": `Bearer ${process.env.SPEECHIFY_AUTH_KEY}`
        }

        let bodyContent = JSON.stringify({ "ssml": `<speak><prosody rate=\"5.000000000000007%\">${text}</prosody></speak>`, "voice": { "name": "Jason", "engine": "azure", "language": "en-US" }, "forcedAudioFormat": "mp3" });

        let reqOptions = {
            url: "https://audio.api.speechify.dev/v1/synthesis/get",
            method: "POST",
            headers: headersList,
            responseType: "stream",
            data: bodyContent,
        }

        let response = await axios.request(reqOptions);

        const fileName = `ashishTONY${Date.now()}.mp3`;
        // let filePath = join(process.cwd(), "uploads", fileName);

        const writeStream = createWriteStream(fileName);

        response.data.pipe(writeStream);

        // Handle errors
        writeStream.on('error', (err) => {
            console.error('Error writing to file:', err);
        });

        // Listen for the 'finish' event to know when writing is complete
        writeStream.on('finish', () => {
            console.log('File saved successfully:');
        });
    } catch (err) {
        console.log(err);
    }
}

text2speech("The weird and wonderful world of plasma isn't just in the cosmos; it's all around us. From lightning storms to neon signs, plasma shapes our world");