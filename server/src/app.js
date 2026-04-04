const express = require('express')
const cors = require('cors');
const cookieparser =require('cookie-parser')
const authroutes = require('./routes/auth.routes');
const postroutes =require('./routes/post.routes')
const authMiddleware = require('./middlewares/auth.middleware');
const app = express()

app.use(cors());
app.use(express.json())
app.use(cookieparser())

app.use('/api/auth', authroutes)
app.use('/api/post', postroutes)

module.exports = app