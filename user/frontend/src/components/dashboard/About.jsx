import "../../public/dashboard.css";

function AboutUs() {
    return (
        <>
            <div className="dummy"></div>
            {/* Hero Section */}
            <section class="about-hero">
                <div class="container">
                    <h1 class="display-5 fw-bold">About LearnHub</h1>
                    <p class="lead mt-3">
                        Empowering learners across the globe with engaging, accessible, and high-quality education.
                    </p>
                </div>
            </section>

            {/* Mission & Vision  */}
            <section class="py-5 mission-vision">
                <div class="container">
                    <div class="row g-4 align-items-center">
                        <div class="col-lg-6">
                            <h2 class="section-title">Our Mission</h2>
                            <p>
                                At LearnHub, our mission is to bridge the gap between knowledge and opportunity.
                                We provide learners with expert-led courses, interactive lessons, and a supportive community to
                                help them grow personally and professionally.
                            </p>
                        </div>
                        <div class="col-lg-6">
                            <h2 class="section-title">Our Vision</h2>
                            <p>
                                We envision a world where education is borderless, inclusive, and accessible to all.
                                Our platform adapts to the needs of each learner, fostering a lifelong love for learning.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
}

export default AboutUs;
