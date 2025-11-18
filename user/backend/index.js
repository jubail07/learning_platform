require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors({ origin: ['http://localhost:5173', process.env.FRONTEND_URL], credentials: true, methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],}))

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