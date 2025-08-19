const Course = require('../model/Courses')
const cloudinary = require('cloudinary').v2

exports.getHome = async (req, res) => {
    try {
        const course = await Course.find()
        return res.render('dashboard/home', { course })
    } catch (error) {
        console.log(error, 'erro in get home')
    }
}

exports.getUploadClass = async (req, res) => {
    try {
        const courseName = req.params.courseName
        const course = await Course.findOne({ course: courseName })
        return res.render('dashboard/uploadClass', { course, classes: course.classUrl || [] })
    } catch (error) {
        console.log(error, 'error in get upload class')
    }
}

exports.uploadClass = async (req, res) => {
    try {
        const { classUrl, contentType } = req.body
        const courseName = req.params.courseName

        const classes = await Course.findOne({ course: courseName })
        let embedUrls = []
        // Convert to embed format
        if (contentType === 'youtube' || contentType === 'vimeo') {
            const convertToEmbed = (url) => {
                if (url.includes('watch?v=')) {
                    return url.replace('watch?v=', 'embed/')
                } else if (url.includes('youtu.be/')) {
                    const videoId = url.split('youtu.be/')[1]
                    return `https://www.youtube.com/embed/${videoId}`
                }
                return url // assume already correct format
            }
            const urls = Array.isArray(classUrl) ? classUrl : [classUrl]
            embedUrls.push(
                ...urls.map(url => ({
                    url: convertToEmbed(url),
                    classType: contentType,
                    classId: Date.now()
                }))
            )
        }
        // If uploading a PDF file
        if (contentType === 'pdf' && req.files.pdfFile) {
            const pdfFile = req.files.pdfFile
            const uploaded = await cloudinary.uploader.upload(pdfFile.tempFilePath, {
                resource_type: 'auto',
                folder: 'course_materials',
            });

            embedUrls.push({
                url: uploaded.secure_url,
                classType: 'pdf',
                classId: Date.now()
            });
        }
        classes.classUrl.push(...embedUrls)
        await classes.save()
        return res.redirect(`/admin/course/${courseName}`)
    } catch (error) {
        console.log(error, 'error in dashboard upload class')
    }
}


exports.getNewCoursePage = async (req, res) => {
    try {
        return res.render('dashboard/addNewCourse')
    } catch (error) {
        console.log(error, 'error in dashboard add new course')
    }
}

exports.addNewCourse = async (req, res) => {
    try {
        const { course, description } = req.body
        const { thumbnail } = req.files

        const uploaded = await cloudinary.uploader.upload(thumbnail.tempFilePath, {
            resource_type: 'auto',
            folder: 'thumbnail_course'
        })

        const newCourse = {
            course: course,
            thumbnail: uploaded.secure_url,
            description: description,
            id: Date.now()
        }
        await Course.create(newCourse)
        return res.redirect('/admin/newCourse')
    } catch (error) {
        console.log(error, 'error in dashboard add new course')
    }
}

exports.courses = async (req, res) => {
    try {
        const course = await Course.find()
        return res.render('dashboard/courses', { course })
    } catch (error) {
        console.log(error, 'error in courses')
    }
}

exports.deleteClass = async (req, res) => {
    try {
        await Course.findOneAndUpdate(
            { course: req.params.courseName },
            { $pull: { classUrl: { classId: req.params.classId } } },
        )
        return res.redirect(`/admin/course/${req.params.courseName}`)
    } catch (error) {
        console.log(error, 'error in delete class')
    }
}

exports.logout = async (req, res) => {
    try {
        return res.clearCookie('adminToken').redirect('/admin/login')
    } catch (error) {
        console.log(error, 'error in logout')
    }
}