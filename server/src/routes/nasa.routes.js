const express = require('express')
const { getApod } = require('../controllers/nasa.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router()

router.get('/', authMiddleware, getApod)

module.exports = router