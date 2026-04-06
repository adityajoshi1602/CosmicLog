const express = require('express')
const { getApod, getTrending } = require('../controllers/nasa.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router()

router.get('/', getApod)
router.get('/trending', getTrending);

module.exports = router