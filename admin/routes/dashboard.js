const express = require('express')
const router = express.Router()
const { getHome, uploadClass, getNewCoursePage, addNewCourse, courses, getUploadClass, logout, deleteClass } = require('../controller/dashboard')
const { ifAdminLoggedIn } = require('../middleware/adminVerify')

router
    .route('/')
    .get(ifAdminLoggedIn, getHome)

router
    .route('/newCourse')
    .get(ifAdminLoggedIn, getNewCoursePage)
    .post(ifAdminLoggedIn, addNewCourse)

router
    .route('/course')
    .get(ifAdminLoggedIn, courses)

router
    .route('/course/:courseName')
    .get(ifAdminLoggedIn, getUploadClass)
    .post(ifAdminLoggedIn, uploadClass)

router
    .route('/course/:courseName/delete/:classId')
    .post(deleteClass)

router
    .route('/logout')
    .get(logout)

module.exports = router