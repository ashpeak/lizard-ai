const axios = require('axios');
const jwt = require('jsonwebtoken');
const youtubedl = require('youtube-dl-exec');
const { join } = require('path');

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

    const token = req.headers.token;
    if (!token) return res.status(401).json({ msg: "Unauthorized" });
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    if (!id) return res.status(401).json({ msg: "Unauthorized" });

    const { url, startTime, endTime } = req.body;


    // const url = 'https://www.youtube.com/watch?v=6xKWiCMKKJg';
    const promise = await youtubedl(url,
        {
            output: 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4',
            output: join(process.cwd(), 'uploads', `${Date.now()}.mp4`)
        });

    return res.status(200).json({ msg: "Downloaded" });

}

module.exports = MediaController;