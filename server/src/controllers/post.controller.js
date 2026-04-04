const Post = require('../models/Post');

async function createPost(req, res) {
    try {
        const { title, body, celestialObject, observedAt, location } = req.body;

        if (!title || !body || !celestialObject || !observedAt || !location) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const newPost = await Post.create({
            userId: req.user._id,
            title,
            body,
            celestialObject,
            observedAt,
            location
        });

        return res.status(201).json({
            message: "Post created successfully",
            post: newPost
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to create post"
        });
    }
}

module.exports = { createPost };