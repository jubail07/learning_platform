const express = require('express')
const router = express.Router()
const { getSignup, getLogin, signup, login } = require('../controller/register')
const { redirectIfAdminLoggedIn } = require('../middleware/adminVerify')

router
    .route('/signup')
    .get(redirectIfAdminLoggedIn, getSignup)
    .post(redirectIfAdminLoggedIn, signup)

router
    .route('/login')
    .get(redirectIfAdminLoggedIn, getLogin)
    .post(redirectIfAdminLoggedIn, login)

module.exports = router