const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    course: String,
    description: String,
    thumbnail: String,
    class: [
        {
            classUrl: String,
            classType: String,
            learned: {
                type: Boolean,
                default: false
            },
            classId: String
        }
    ],

    id: String
})

module.exports = mongoose.model('Course', courseSchema)


