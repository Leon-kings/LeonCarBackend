require('dotenv').config()
const registerRouter = require('./routes/register')
const postRouter = require('./routes/Post')
const express = require('express')
const mongoose = require('mongoose')
const db = mongoose.connection
const PORT = process.env.PORT || 5010
const app = express()
app.use(express.json())

mongoose.connect(process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
mongoose.set('strictQuery', true)
app.use(registerRouter);
app.use(postRouter);
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`))