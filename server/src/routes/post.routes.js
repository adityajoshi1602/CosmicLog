const express = require('express');
const { createPost, deletePost, getPosts, reactToPost } = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router()
const multer = require('multer')

const upload = multer({ storage: multer.memoryStorage() })

router.get('/', getPosts);

router.post('/create', authMiddleware, upload.single('image'), createPost);
router.post('/:id/react', authMiddleware, reactToPost);


router.delete('/delete/:id', authMiddleware, deletePost);

module.exports = router