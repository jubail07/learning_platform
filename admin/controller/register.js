const Admin = require('../model/Admin')
const createJWT = require('../utils/adminJWT')

exports.getSignup = async (req, res) => {
    try {
        return res.render('register/signup', { msg: '' })
    } catch (error) {
        console.log(error, 'error in admin get signup')
    }
}

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existAdmin = await Admin.findOne({ email })
        if (existAdmin) {
            return res.render('register/signup', { msg: 'already exist' })
        }
        const newAdmin = {
            name: name,
            email: email,
            password: password,
            id: Date.now
        }
        await Admin.create(newAdmin)
        return res.redirect('/admin/login')
    } catch (error) {
        console.log(error, 'error in signup admin')
    }
}

exports.getLogin = async (req, res) => {
    try {
        return res.render('register/login', { msg: '' })
    } catch (error) {
        console.log(error, 'error in admin get login')
    }
}

exports.login = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email })
        if (!admin) {
            return res.render('register/login', { msg: 'invalid, please try again' })
        }
        const isMatch = await admin.validatePassword(req.body.password)
        if (!isMatch) {
            return res.render('register/login', { msg: 'invalid, please try again' })
        }
        const token = createJWT(admin)
        res.cookie('adminToken', token, { httpOnly: true })
        return res.redirect('/admin')
    } catch (error) {
        console.log(error, 'error in admin login')
    }
}

