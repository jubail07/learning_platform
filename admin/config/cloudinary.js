const cloudinary = require('cloudinary')

exports.connectCloudinary = async () => {
    await cloudinary.config({
          cloud_name: process.env.CLOUDNAME,
          api_key: process.env.API_KEY,
          api_secret: process.env.API_SECRET,
    })
    console.log('connected to cloudinary')
}