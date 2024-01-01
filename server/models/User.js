const mongoose = require('mongoose');
const Project = require('./Project');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    g_id: {
        type: String,
        unique: true,
        trim: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    avatar: {
        type: String,
        required: true,
        trim: true,
    },
    credit: {
        type: Number,
        default: 15,
    },
    role: {
        type: String,
        default: 'User'
    },
    uploadedFiles: {
        type: Array,
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;