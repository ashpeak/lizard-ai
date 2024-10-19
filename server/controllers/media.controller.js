const axios = require('axios');
const jwt = require('jsonwebtoken');
const { join } = require('path');
const { unlink, readdir } = require('fs').promises;
const fs = require('fs');
const youtubedl = require('youtube-dl-exec');
const { trimVideo } = require('../lib/ffmpeg');

const MediaController = {};

MediaController.getMedia = async (req, res) => {
    try {
        const token = req.headers.token;
        if (!token) return res.status(401).json({ msg: "Unauthorized" });
        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        if (!id) return res.status(401).json({ msg: "Unauthorized" });

        let headersList = {
            "Accept": "*/*",
            "sec-ch-ua": '"Microsoft Edge";v="119", "Chromium";v="119", "Not ? A_Brand";v="24"',
            "origin": "https://app.fliki.ai",
            "referer": "https://app.fliki.ai",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + process.env.FLIKI_AUTH_KEY
        }

        let { query, type } = req.body;
        if (!type) type = "video";
        if (!query) query = "";

        let reqOptions = {
            url: `https://api.fliki.ai/rpc/mediaStock.list?batch=1&input=%7B%220%22%3A%7B%22text%22%3A%22${query}%22%2C%22type%22%3A%22${type}%22%2C%22page%22%3A1%2C%22playbackId%22%3A%22670d596b3c1bc4ab31a06a96%22%2C%22sceneId%22%3A%22670d596b3c1bc4ab31a06a99%22%2C%22filter%22%3A%22music%22%7D%7D`,
            method: "GET",
            headers: headersList,
        }

        let response = await axios.request(reqOptions);

        return res.status(200).json(response.data[0].result.data.data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

MediaController.getMusic = async (req, res) => {

    try {

        const token = req.headers.token;
        if (!token) return res.status(401).json({ msg: "Unauthorized" });
        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        if (!id) return res.status(401).json({ msg: "Unauthorized" });

        let headersList = {
            "Accept": "*/*",
            "sec-ch-ua": '"Microsoft Edge";v="119", "Chromium";v="119", "Not ? A_Brand";v="24"',
            "origin": "https://app.fliki.ai",
            "referer": "https://app.fliki.ai",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + process.env.FLIKI_AUTH_KEY
        }

        let { query, filter } = req.body;
        if (!filter) type = "music";
        if (!query) query = "";

        let reqOptions = {
            url: `https://api.fliki.ai/rpc/mediaStock.list?batch=1&input=%7B%220%22%3A%7B%22text%22%3A%22${query}%22%2C%22type%22%3A%22audio%22%2C%22page%22%3A1%2C%22playbackId%22%3A%22670d596b3c1bc4ab31a06a96%22%2C%22sceneId%22%3A%22670d596b3c1bc4ab31a06a97%22%2C%22filter%22%3A%22${filter}%22%7D%7D`,
            method: "GET",
            headers: headersList,
        }

        let response = await axios.request(reqOptions);

        return res.status(200).json(response.data[0].result.data.data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

MediaController.downloadYoutubeVideo = async (req, res) => {

    const { token, id: projectId } = req.headers;
    if (!token) return res.status(401).json({ msg: "Unauthorized" });
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    if (!id) return res.status(401).json({ msg: "Unauthorized" });

    const { url, startTime, endTime } = req.body;
    const filename = `${id}-${Date.now()}-utube`;
    const output = join(process.cwd(), 'uploads', filename);

    await youtubedl(url,
        {
            output: 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4',
            output: output,
        });

    if (startTime || endTime) {
        await trimVideo(filename, output, startTime, endTime);
        unlink(output + '.webm');
    }

    return res.status(200).json({ msg: "Downloaded" });

}

MediaController.getTubeDownloadedVideos = async (req, res) => {

    const token = req.headers.token;
    if (!token) return res.status(401).json({ msg: "Unauthorized" });
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    if (!id) return res.status(401).json({ msg: "Unauthorized" });

    const files = (await readdir(join(process.cwd(), 'uploads'))).filter(file => file.startsWith(id) && file.endsWith('_trimmed.mp4'));

    if (!files || files.length === 0) return res.status(200).json([]);

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

MediaController.getDemoSpeech = async (req, res) => {

    const { name } = req.params;

    const file = join(process.cwd(), 'files', `${name}.mp3`);

    if (!fs.existsSync(file)) {
        return res.status(404).send('File not found');
    }

    return res.status(200).sendFile(file);

}

module.exports = MediaController;