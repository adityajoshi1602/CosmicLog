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
        trim: true,
        minlength: 3,
        maxlength: 150
    },

    body: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 5000
    },

    celestialObject: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        index: true
    },

    observedAt: {
        type: Date,
        required: true,
        index: true
    },

    location: {
        type: String,
        required: true,
        trim: true
    },

    reactionCounts: {
        witness: { type: Number, default: 0 },
        wow: { type: Number, default: 0 },
        love: { type: Number, default: 0 }
    }

}, { timestamps: true });

const postmodel = mongoose.model('post', postSchema)

module.exports=postmodel