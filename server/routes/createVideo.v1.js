const { Router } = require("express");
const videoController = require("../controllers/createVideo.v1");

const router = Router();

router.post("/create", videoController.createVideo);

module.exports = router;