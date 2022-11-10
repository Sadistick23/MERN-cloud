require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsMiddleware = require('./middleware/cors-middleware')
const authRouter = require('./routes/index')
const fileRouter = require('./routes/file-router')
const errorMiddleware = require('./middleware/error-middleware')
const fileUpload = require('express-fileupload')
const filePathMiddleware = require('./middleware/filepath-middleware')
const path = require('path')

const app = express()
PORT = process.env.PORT || 5000

app.use(fileUpload({}))
app.use(express.json())
app.use(filePathMiddleware(path.resolve(__dirname, 'files')))
app.use(express.static('static'))
app.use(cookieParser())
app.use(corsMiddleware)

app.use("/api/auth", authRouter)
app.use("/api/file", fileRouter)
app.use(errorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(process.env.DBURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT,() => {
            console.log(`Server started on ${PORT} port`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()