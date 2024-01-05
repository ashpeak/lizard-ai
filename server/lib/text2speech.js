const axios = require('axios');
const { join } = require("path");
const { createWriteStream } = require("fs");


const voices = {
    'jenny-en': { "ssml": `<speak><mstts:silence type=\"Sentenceboundary-exact\" value=\"500ms\"></mstts:silence><mstts:silence type=\"Tailing-exact\" value=\"1000ms\"></mstts:silence><mstts:express-as style=\"newscast\"><prosody pitch=\"-2%\" rate=\"15%\">${text}</prosody></mstts:express-as></speak>`, "voice": { "name": "Guy", "engine": "azure", "language": "en-US" }, "forcedAudioFormat": "mp3" },
    'guy-en': { "ssml": `<speak><mstts:silence type=\"Sentenceboundary-exact\" value=\"500ms\"></mstts:silence><mstts:silence type=\"Tailing-exact\" value=\"1000ms\"></mstts:silence><mstts:express-as style=\"newscast\"><prosody pitch=\"-2%\" rate=\"15%\">${text}</prosody></mstts:express-as></speak>`, "voice": { "name": "Guy", "engine": "azure", "language": "en-US" }, "forcedAudioFormat": "mp3" },
    'ashish-en': { "ssml": `<speak>${text}</speak>`, "voice": { "name": "PVL:7d6c8060-5513-46ee-9548-a88f451da9da", "engine": "speechify", "language": "en-US" }, "forcedAudioFormat": "mp3" },
    'ashish-hi': { "ssml": `<speak>${text}</speak>`, "voice": { "name": "PVL:7d6c8060-5513-46ee-9548-a88f451da9da", "engine": "speechify", "language": "en-US" }, "forcedAudioFormat": "mp3" },
    'madhur-hi': { "ssml": `<speak>${text}</speak>`, "voice": { "name": "Madhur", "engine": "azure", "language": "hi-IN" }, "forcedAudioFormat": "mp3" },
    'swara-hi': { "ssml": `<speak>${text}</speak>`, "voice": { "name": "Swara", "engine": "azure", "language": "hi-IN" }, "forcedAudioFormat": "mp3" }
}

const text2speech = async (text, name, voiceoverModel) => {
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

            let bodyContent = JSON.stringify(voices[voiceoverModel]);

            let reqOptions = {
                url: process.env.SPEECHIFY_API_URL,
                method: "POST",
                headers: headersList,
                responseType: "stream",
                data: bodyContent,
            }

            let response = await axios.request(reqOptions);

            let filePath = join(process.cwd(), "audioGenerated", `${name}.mp3`);

            const writeStream = createWriteStream(filePath);

            response.data.pipe(writeStream);

            // Handle errors
            writeStream.on('error', (err) => {
                console.error('Error writing to file:', err);
                reject(err);
            });

            // Listen for the 'finish' event to know when writing is complete
            writeStream.on('finish', () => {
                resolve(`${name}.mp3`);
            });

        } catch (err) {
            console.log(err);
        }
    });
}

module.exports = text2speech;