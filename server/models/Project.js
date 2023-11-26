const mongoose = require('mongoose');
const User = require('./User');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    length: {
        type: Number,
        default: 30
    },
    bg_Music: {
        type: String,
        default: 'none'
    },
    script: [
        {
            scene_number: {
                type: Number,
                required: true,
            },
            media: {
                type: String,
                default: 'none'
            },
            text: {
                type: String,
                default: 'none'
            },
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['ready', 'pending'],
        default: 'ready'
    },
    isGenerated: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

ProjectSchema.pre('save', async function (next) {
    const User = require('./User');
    try {
        const user = await User.findById(this.user);
        user.projects.push(this._id);
        await user.save();
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Project', ProjectSchema);