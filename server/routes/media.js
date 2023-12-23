const { Router } = require('express');

const router = Router();

const MediaController = require('../controllers/media.controller');

router.post('/', MediaController.getMedia);

router.post('/music', MediaController.getMusic);

router.post('/youtube/download', MediaController.downloadYoutubeVideo);

router.get('/youtube/download', MediaController.getTubeDownloadedVideos);

router.get('/youtube/:name', MediaController.getTubeSingleVideo);

router.get('/speech/demo/:name', MediaController.getDemoSpeech);

module.exports = router;