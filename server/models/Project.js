const mongoose = require('mongoose');
const User = require('./User');

/**
 * Represents the schema for a project in the application.
 *
 * @typedef {Object} ProjectSchema
 * @property {string} name - The name of the project.
 * @property {Object} bgMusic - The background music for the project.
 * @property {string} bgMusic.preview - The preview of the background music.
 * @property {string} bgMusic.name - The name of the background music.
 * @property {number} subtitlePosition - The position of the subtitles in the project.
 * @property {number} music - The volume of the music in the project.
 * @property {number} voiceover - The volume of the voiceover in the project.
 * @property {Array} script - The script for the project.
 * @property {Object} script.dialogue - The dialogue for a script item.
 * @property {string} script.image - The image for a script item.
 * @property {string} script.type - The type of a script item.
 * @property {string} script.download - The download link for a script item.
 * @property {string} generatedUrl - The generated URL for the project.
 * @property {mongoose.Schema.Types.ObjectId} user - The user associated with the project.
 * @property {string} status - The status of the project.
 * @property {boolean} isGenerated - Indicates whether the project has been generated.
 * @property {Date} createdAt - The date and time when the project was created.
 * @property {Date} updatedAt - The date and time when the project was last updated.
 */

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    bgMusic: {
        preview: {
            type: String,
        },
        name: {
            type: String,
        }
    },
    subtitlePosition: {
        type: Number,
        default: 5
    },
    music: {
        type: Number,
        default: 0.1
    },
    voiceover: {
        type: Number,
        default: 1
    },
    script: [
        {
            dialogue: {
                type: String,
            },
            image: {
                type: String,
            },
            type: {
                type: String
            },
            download: {
                type: String,
                default: 'none'
            },
        }
    ],
    language: {
        type: String,
        default: 'English'
    },
    generatedUrl: {
        type: String,
        default: ''
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['ready', 'processing'],
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