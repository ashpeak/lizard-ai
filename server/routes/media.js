const { Router } = require('express');

const router = Router();

const MediaController = require('../controllers/media.controller');

router.post('/', MediaController.getMedia);

router.post('/music', MediaController.getMusic);

router.post('/youtube/download', MediaController.downloadYoutubeVideo)

module.exports = router;