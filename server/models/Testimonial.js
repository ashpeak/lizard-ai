const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    feeling: {
        type: String,
        required: true,
        enum: ['Loved', 'good', 'average']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
