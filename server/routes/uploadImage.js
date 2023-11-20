const { Router } = require('express');
const upload = require('../lib/multer');
const uploadHandler = require("../controllers/uploadHandler");

const router = Router();

router.post("/", upload.single("image"), uploadHandler.uploadToCloudinary);


module.exports = router;