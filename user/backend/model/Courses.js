const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    course: String,
    description: String,
    thumbanail:String,
    classUrl: [
        {
            url: String,
            classType: String,
            classId: String
        }
    ],
    id: String
})

module.exports = mongoose.model('Course', courseSchema)
