const express = require('express')
const router = express.Router()
const { Signup, Login } = require('../controller/register')

router
    .route('/signup')
    .post(Signup)

router
    .route('/login')
    .post(Login)

module.exports = router