const JWT = require('jsonwebtoken')

module.exports = (admin)=>{
    try {
        return JWT.sign(
            {
                id:admin.id,
                email:admin.email
            },'secret'
        )
    } catch (error) {
        console.log(error,'error in admin jwt')
    }
}