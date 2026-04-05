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


async function reactToPost(req, res) {
    try {
        const { id } = req.params;
        const { type, action } = req.body;

        const validTypes = ['witness', 'wow', 'love'];
        const validActions = ['add', 'remove'];

        if (!validTypes.includes(type)) {
            return res.status(400).json({
                message: "Invalid reaction type"
            });
        }

        if (!validActions.includes(action)) {
            return res.status(400).json({
                message: "Invalid action"
            });
        }

        const incValue = action === 'add' ? 1 : -1;

        const post = await Post.findByIdAndUpdate(
            id,
            { $inc: { [`reactionCounts.${type}`]: incValue } },
            { new: true }
        );

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        if (post.reactionCounts[type] < 0) {
            post.reactionCounts[type] = 0;
            await post.save();
        }

        return res.status(200).json({
            message: "Reaction updated successfully",
            reactions: post.reactionCounts
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to react to post"
        });
    }
}



module.exports = { createPost, deletePost, getPosts, reactToPost };