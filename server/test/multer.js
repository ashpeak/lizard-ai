const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        let ext = ''; // set default extension (if any)
        if (file.originalname.split(".").length > 1) // checking if there is an extension or not.
            ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        else ext = '.png';

        const name = `${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}${ext}`;
        cb(null, name)
    }
});

const upload = multer({ storage: storage });

module.exports = upload;