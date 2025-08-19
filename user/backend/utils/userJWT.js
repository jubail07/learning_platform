const JWT = require('jsonwebtoken')

module.exports = (user)=>{
    try {
        return JWT.sign(
            {
                id:user.id,
                username:user.username,
                email:user.email
            },'secret'
        )
    } catch (error) {
        console.log(error,'error in admin jwt')
    }
}