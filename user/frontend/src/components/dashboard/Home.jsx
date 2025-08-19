import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../../public/dashboard.css";
import CourseCard from "./CourseCard";

function Home() {
    const [courses, setCourses] = useState([]);
    const [username, setUsername] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const request = await fetch(`http://localhost:3000/user`, {
                    method: "GET",
                    credentials: "include",
                });
                if (request.status === 401) {
                    return navigate("/login")
                }
                const response = await request.json()
                setCourses(response.courses)
                setUsername(response.username)
            } catch (error) {
                console.log(error, "error in fetch data")
            }
        };
        fetchData()
    }, [navigate])

    return (
        <>
            <div className="dummy"></div>
            {/* Hero Section */}
            <h1 className="text-center mt-5 mb-4">Welcome to <span style={{ color: "#584dff", fontWeight:"600" }}>Learnhub</span>, <span style={{ textTransform: "capitalize" }}>{username}</span></h1>

            {/* Courses Section */}
            <section className="py-5" id="course-section">
                <div className="container">
                    <h2 className="text-center mb-5 fw-bold">Our Courses</h2>
                    <div className="row">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                className="col-12 col-sm-6 col-lg-3"
                            >
                                <CourseCard
                                    thumbnail={course.thumbnail}
                                    course={course.course}
                                    description={course.description}
                                    onClick={() => {
                                        if (
                                            course.classUrl &&
                                            course.classUrl.length > 0
                                        ) {
                                            navigate(
                                                `/class/${course.id}/${course.classUrl[0].classId}`
                                            );
                                        } else {
                                            alert(
                                                "No classes available for this course."
                                            );
                                        }
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
