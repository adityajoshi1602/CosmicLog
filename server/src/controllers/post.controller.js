const Post = require('../model/post.model')
const uploadFile = require('../services/storage.service');

async function createPost(req, res) {
    try {
        const { title, body, celestialObject, observedAt, location } = req.body;

        if (!title || !body || !celestialObject || !observedAt || !location) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Image is required"
            });
        }

        const imageData = await uploadFile(req.file);

        const newPost = await Post.create({
            userId: req.user._id,
            title,
            body,
            celestialObject,
            observedAt,
            location,
            image: imageData.url
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

async function deletePost(req, res) {
    try {
        const { id } = req.params;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        // check ownership
        if (post.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        await Post.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Post deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to delete post"
        });
    }
}

async function getPosts(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;

        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('userId', 'username email');

        return res.status(200).json({
            page,
            count: posts.length,
            posts
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to fetch posts"
        });
    }
}


module.exports = { createPost, deletePost, getPosts };