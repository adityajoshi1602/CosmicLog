const express = require('express')
const cors = require('cors');
const authroutes = require('./routes/auth.routes')
const app = express()

app.use(cors());
app.use(express.json())

app.use('/api/auth', authroutes)

module.exports = app