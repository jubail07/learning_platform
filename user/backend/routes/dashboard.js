const express = require('express')
const router = express.Router()
const { Home, getClasses, logout, contact } = require('../controller/dashboard')
const { ifUserLoggedIn } = require('../middleware/userVerifier')


router
    .route('/')
    .get(ifUserLoggedIn, Home)

router
    .route('/contact')
    .post(contact)

router
    .route('/logout')
    .get(logout)

router
    .route('/:id')
    .get(getClasses)



module.exports = router