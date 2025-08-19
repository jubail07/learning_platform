const jwt = require('jsonwebtoken')

exports.ifAdminLoggedIn = async (req, res, next) => {
    try {
        const adminToken = req.cookies?.adminToken
        if (adminToken) {
            const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
            if (decoded) {
                req.admin = decoded
                next()
            } else {
                return res.clearCookie('adminToken').render('register/login', { msg: 'unexpected error' })
            }
        } else {
            return res.redirect('/admin/login');
        }
    } catch (error) {
        console.log(error, 'error in middleware')
    }
}

exports.redirectIfAdminLoggedIn = async (req, res, next) => {
    try {
        const adminToken = req.cookies?.adminToken
        if (adminToken) {
            const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
            if (decoded) {
                return res.redirect('/admin')
            }
        }
        next()
    } catch (error) {
        console.log(error, 'error in verified middleware')
    }
}