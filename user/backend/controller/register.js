const User = require('../model/User')
const createJWT = require('../utils/userJWT')

exports.Signup = async (req, res) => {
    try {
        const { email, username, password } = req.body
        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.json({ msg: 'Already Exist' })
        }
        const newUser = {
            email: email,
            username: username,
            password: password,
            id: Date.now()
        }
        await User.create(newUser)
        return res.json(newUser)
    } catch (error) {
        console.log(error, ' error in user signup')
    }
}

exports.Login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        console.log(user)
        if (!user) {
            return res.json({ msg: 'invalid, please try again' })
        }
        const isMatch = await user.validatePassword(req.body.password)
        if (!isMatch) {
            return res.json({ msg: 'invalid, please try again' })
        }
        const token = createJWT(user)
        res.cookie('userToken', token, { httpOnly: true, secure:true, sameSite:"none" })
        return res.json(user)
    } catch (error) {
        console.log(error, 'error in user login')
    }
}