const Course = require('../model/Courses')
const Contact = require('../model/Contact')

exports.Home = async (req, res) => {
    try {
        const courses = await Course.find()
        const username = req.user.username
        return res.json({courses, username })
    } catch (error) {
        console.log(error, 'error in user home')
    }
}

exports.getClasses = async (req, res) => {
    try {
        const classes = await Course.findOne({ id: req.params.id })
        console.log(classes)
        return res.json(classes)
    } catch (error) {
        console.log(error, 'error in user classes')
    }
}

exports.contact = async (req, res) => {
    try {
        const { name, email, message } = req.body
        const newContact = {
            name: name,
            email: email,
            message: message
        }
        await Contact.create(newContact)
        return res.json({ msg: 'message send succesfully' })
    } catch (error) {
        console.log(error, 'error in contact')
    }
}

exports.logout = async (req, res) => {
    try {
        return res.clearCookie('userToken', { httpOnly: true }).json()
    } catch (error) {
        console.log(error, 'error in logout')
    }
}

