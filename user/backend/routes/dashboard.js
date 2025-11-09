const express = require('express')
const router = express.Router()
const { Home, getClasses, logout, contact, markLearned,  } = require('../controller/dashboard')
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

router
    .route('/:id/learned/:classId')
    .put(markLearned)



module.exports = router