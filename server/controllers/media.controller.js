const axios = require('axios');
const jwt = require('jsonwebtoken');
const { join } = require('path');
const { unlink, readdir } = require('fs').promises;
const fs = require('fs');
// const youtubedl = require('youtube-dl-exec');
const { trimVideo } = require('../lib/ffmpeg');

const MediaController = {};

MediaController.getMedia = async (req, res) => {

    const token = req.headers.token;
    if (!token) return res.status(401).json({ msg: "Unauthorized" });
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    if (!id) return res.status(401).json({ msg: "Unauthorized" });

    let headersList = {
        "Accept": "application/json, text/plain, */*",
        "sec-ch-ua-platform": '"Windows"',
        "authentication": `Bearer ${process.env.FLIKI_AUTH_KEY}`,
        "Content-Type": "application/json",
        "sec-ch-ua": '"Microsoft Edge";v="119", "Chromium";v="119", "Not ? A_Brand";v="24"',
        "origin": "https://app.fliki.ai",
        "referer": "https://app.fliki.ai"
    }

    const { query, type } = req.body;
    let bodyContent = JSON.stringify({
        "operation": "mediaStockList",
        "params": {
            "text": query,
            "type": type,
            "page": 1,
            "contentId": process.env.CONTENT_ID,
            "filter": ""
        }
    });

    let reqOptions = {
        url: process.env.MEDIA_API_URL,
        method: "POST",
        headers: headersList,
        data: bodyContent,
    }

    let response = await axios.request(reqOptions);

    return res.status(200).json(response.data.data);
}

MediaController.getMusic = async (req, res) => {

    const token = req.headers.token;
    if (!token) return res.status(401).json({ msg: "Unauthorized" });
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    if (!id) return res.status(401).json({ msg: "Unauthorized" });

    let headersList = {
        "Accept": "application/json, text/plain, */*",
        "sec-ch-ua-platform": '"Windows"',
        "authentication": `Bearer ${process.env.FLIKI_AUTH_KEY}`,
        "Content-Type": "application/json",
        "sec-ch-ua": '"Microsoft Edge";v="119", "Chromium";v="119", "Not ? A_Brand";v="24"',
        "origin": "https://app.fliki.ai",
        "referer": "https://app.fliki.ai"
    }

    const { query, filter } = req.body;
    let bodyContent = JSON.stringify({
        "operation": "mediaStockList",
        "params": {
            "text": query,
            "type": "audio",
            "page": 1,
            "contentId": process.env.CONTENT_ID,
            "filter": filter
        }
    });

    let reqOptions = {
        url: process.env.MEDIA_API_URL,
        method: "POST",
        headers: headersList,
        data: bodyContent,
    }

    let response = await axios.request(reqOptions);

    return res.status(200).json(response.data.data);
}

MediaController.downloadYoutubeVideo = async (req, res) => {

    const { token, id: projectId } = req.headers;
    if (!token) return res.status(401).json({ msg: "Unauthorized" });
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    if (!id) return res.status(401).json({ msg: "Unauthorized" });

    const { url, startTime, endTime } = req.body;
    const output = join(process.cwd(), 'uploads', `${projectId}-${Date.now()}-utube`);

    await youtubedl(url,
        {
            output: 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4',
            output: output,
        });

    if (startTime || endTime) {
        await trimVideo(output, startTime, endTime);
        unlink(output + '.webm');
    }

    return res.status(200).json({ msg: "Downloaded" });

}

MediaController.getTubeDownloadedVideos = async (req, res) => {

    const token = req.headers.token;
    if (!token) return res.status(401).json({ msg: "Unauthorized" });
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    if (!id) return res.status(401).json({ msg: "Unauthorized" });

    const files = (await readdir(join(process.cwd(), 'uploads'))).filter(file => file.endsWith('_trimmed.mp4'));

    return res.status(200).json(files);

}

MediaController.getTubeSingleVideo = async (req, res) => {

    const { name } = req.params;

    const file = join(process.cwd(), 'uploads', name);

    if (!fs.existsSync(file)) {
        return res.status(404).send('File not found');
    }

    return res.status(200).sendFile(file);

}

module.exports = MediaController;