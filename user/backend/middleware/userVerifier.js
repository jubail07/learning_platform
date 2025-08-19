const jwt = require('jsonwebtoken')

exports.ifUserLoggedIn = async (req, res, next) => {
    try {
        const userToken = req.cookies?.userToken
        if (userToken) {
            const decoded = jwt.verify(userToken, process.env.JWT_SECRET);
            if (decoded) {
                req.user = decoded
                next()
            }
        } else {
            return res.status(401).json('unexpected error');
        }
    } catch (error) {
        console.log(error, 'error in user middleware')
    }
}