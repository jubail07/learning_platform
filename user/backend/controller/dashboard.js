const Course = require('../model/Courses')
const Contact = require('../model/Contact')

exports.Home = async (req, res) => {
    try {
        const courses = await Course.find()
        const username = req.user.username
        return res.json({ courses, username })
    } catch (error) {
        console.log(error, 'error in user home')
    }
}

exports.getClasses = async (req, res) => {
    try {
        const classes = await Course.findOne({ id: req.params.id })
        return res.json(classes)
    } catch (error) {
        console.log(error, 'error in user classes')
    }
}

exports.markLearned = async (req, res) => {
    try {
        const { id, classId } = req.params
        const { learned } = req.body

        const course = await Course.findOne({ id })
        if (!course) return res.status(404).json({ message: "Course not found" })

        const classFound = course.class.find(c => c.classId === classId)
        if (!classFound) return res.status(404).json({ message: "Class not found" })

        classFound.learned = learned
        await course.save()
        return res.json({ success: true, message: learned ? "Marked as watched" : "Unmarked" })
    } catch (error) {
        console.log(error, 'error in learned, user backend')
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

