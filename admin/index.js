require('dotenv').config()

const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('static'))

var cookieparser = require('cookie-parser')
app.use(cookieparser())

const { connectDB } = require('./config/database')
connectDB()
const { connectCloudinary } = require('./config/cloudinary')
connectCloudinary()

const fileUpload = require('express-fileupload')
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

const authRoute = require('./routes/dashboard')
const register = require('./routes/register')
app.use('/admin', authRoute, register)

const port = process.env.PORT || 2000

app.listen(port, () => {
    console.log('app started')
})