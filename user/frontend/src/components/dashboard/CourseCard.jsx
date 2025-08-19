import '../../public/dashboard.css'

function CourseCard({ course, description, thumbnail, onClick }) {
    return (
        <div className="course-card p-3" onClick={onClick}>
            <img className='video-thumbnail' src={thumbnail} alt="" />
            <h2 className=' '>{course}</h2>
            <p className='bg-transparent mt-2'>{description}</p>
        </div>
    );
}
export default CourseCard;