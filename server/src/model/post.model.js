const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },

    title: {
        type: String,
        required: true,
        trim: true
    },

    body: {
        type: String,
        required: true,
        trim: true
    },

    celestialObject: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    observedAt: {
        type: Date,
        required: true
    },

    location: {
        type: String,
        required: true,
        trim: true
    },

    image: {
        type: String,
        required: true
    },

    reactionCounts: {
        witness: { type: Number, default: 0 },
        wow: { type: Number, default: 0 },
        love: { type: Number, default: 0 }
    }

}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);