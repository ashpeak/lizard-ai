const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    avatar: String,
    role: String,
    uploadedFiles: [],
    createdAt: Date,
    updatedAt: Date,
});

const User = mongoose.model('Userr', UserSchema);

module.exports = User;