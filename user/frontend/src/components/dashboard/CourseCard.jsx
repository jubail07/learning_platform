import '../../public/dashboard.css'
import { motion } from "framer-motion"

function CourseCard({ course, onClick }) {
    const classes = course.class || [];
    const learnedCount = classes.filter(c => c.learned).length;
    const totalClasses = classes.length;
    const percentage = totalClasses > 0 ? (learnedCount / totalClasses) * 100 : 0;

    return (
        <motion.div className="course-card p-3" onClick={onClick} whileHover={{ scale: 1.04, y: -6 }}
            transition={{ type: "spring", stiffness: 200 }}>
            <img className='video-thumbnail' src={course.thumbnail} alt="" />

            <div className="progress-container">
                <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
            </div>

            <h2 className=''>{course.course}</h2>
            <p className='bg-transparent '>{course.description}</p>
        </motion.div>
    );
}
export default CourseCard;