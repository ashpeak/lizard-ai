const mongoose = require('mongoose');
const User = require('./User');

const EmailCodeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        expires: 180,
        default: Date.now
    }
}, { timestamps: true });

const EmailCode = mongoose.model('EmailCode', EmailCodeSchema);

module.exports = EmailCode;