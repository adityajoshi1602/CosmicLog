const express = require('express')
const cors = require('cors');
const authroute= require('./routes/auth.routes')
const app = express()

app.use(cors());
app.use(express.json())

app.use('/api/auth',)

module.exports = app