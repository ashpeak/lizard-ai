const { Router } = require("express");
const router = Router();
const upload = require('../lib/multer');

router.post("/videos", upload.single("image"), async (req, res) => {
    console.log(req.file.filename);
    return res.status(200).json({ msg: "ok" });
});

router.get("/videos", async (req, res) => {
    return res.status(200).json({ msg: "ok" });
});

module.exports = router;