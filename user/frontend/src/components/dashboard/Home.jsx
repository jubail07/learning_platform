import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../../public/dashboard.css";
import CourseCard from "./CourseCard";
import { motion } from "framer-motion"
const API = import.meta.env.VITE_API_URL;

function Home() {
    const [courses, setCourses] = useState([]);
    const [username, setUsername] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const request = await fetch(`${API}/user`, {
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
            <h1 className="text-center mt-5 mb-4">Welcome to <span style={{ color: "#584dff", fontWeight: "600" }}>Learnhub</span>, <span style={{ textTransform: "capitalize" }}>{username}</span></h1>

            <section>
                <div className="w-100 d-flex justify-content-center">
                    <img className="top_cover_img" src="/Group-121-1-1536x802.png" alt="" />
                </div>
            </section>

            {/* Courses Section */}
            <section className="py-5 " id="course-section">
                <div className="container">
                    <h2 className="text-center mb-5 fw-bold">Courses We Provide</h2>
                    <div className="row">
                        {courses.map((course, index) => (
                            <motion.div
                                key={course.id}
                                className="col-12 col-sm-6 col-lg-3"
                                initial={{ opacity: 0, y: 60 }}        // start position
                                whileInView={{ opacity: 1, y: 0 }}     // end position
                                viewport={{ once: true, amount: 0.2 }} // trigger only once
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,               // stagger animation
                                    ease: "easeOut"
                                }}
                            >
                                <CourseCard
                                    course={course}
                                    onClick={() => {
                                        if (
                                            course.class &&
                                            course.class.length > 0
                                        ) {
                                            navigate(
                                                `/class/${course.id}/${course.class[0].classId}`
                                            );
                                        } else {
                                            alert(
                                                "No classes available for this course."
                                            );
                                        }
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
