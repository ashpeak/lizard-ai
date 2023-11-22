const { Router } = require('express');

const router = Router();

const MediaController = require('../controllers/media.controller');

router.post('/', MediaController.getMedia);

module.exports = router;