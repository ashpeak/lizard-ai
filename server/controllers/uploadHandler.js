const { unlink } = require("fs/promises");
const { join } = require("path");
const cloudinary = require("../configs/cloudinary.config");
const connectDB = require("../configs/db");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const uploadToCloudinary = async (req, res) => {

    const maxRetries = 3;
    let retryCount = 0;
    const name = req.file.filename;
    const token = req.headers.token;
    
    if(!token) return res.status(401).json({ msg: "Unauthorized" });
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    if (!id) return res.status(401).json({ msg: "Unauthorized" });

    await connectDB();

    while (retryCount < maxRetries) {

        try {
            let filePath = join(process.cwd(), "uploads", name);
            filePath = filePath.replace(/\\/g, '/');

            const result = await cloudinary.uploader.upload(filePath, {
                folder: "images",
                use_filename: true,
                unique_filename: false
            });
            unlink(filePath);

            // Insert the image url into the database
            const user = await User.findByIdAndUpdate(id,
                { $push: { uploadedFiles: result.secure_url } },
                { new: true });

            if (!user) return res.status(404).json({ msg: "User not found" });

            return res.status(200).json({ url: result.secure_url });

        } catch (error) {
            console.log(error);
            retryCount++;
        }
    }

    res.status(500).json({ msg: "Something went wrong" });
}

module.exports = {
    uploadToCloudinary
}