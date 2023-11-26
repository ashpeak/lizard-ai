const mongoose = require('mongoose');
const Project = require('./Project');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    avatar: String,
    role: String,
    uploadedFiles: [],
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],
    createdAt: Date,
});

const User = mongoose.model('Userr', UserSchema);

module.exports = User;