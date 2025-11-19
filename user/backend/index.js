require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
app.set("trust proxy", 1)
app.use(cors({ origin: ['http://localhost:5173', 'https://learning-platform-1-lef3.onrender.com'], credentials: true, methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],}))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

var cookieparser = require('cookie-parser')
app.use(cookieparser())

const { connectDB } = require('./config/database')
connectDB()

const register = require('./routes/register')
const dashboard = require('./routes/dashboard')
app.use('/', register)
app.use('/user', dashboard)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('app started')
})