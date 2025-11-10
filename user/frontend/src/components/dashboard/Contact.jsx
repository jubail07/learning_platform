import { useState } from "react";
import "../../public/dashboard.css";
const API = import.meta.env.VITE_API_URL;

function ContactUs() {
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API}/user/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (res.ok) {
                alert(data.msg);
                setFormData({ name: "", email: "", subject: "", message: "" });
            }
        } catch (error) {
            alert("Failed to send message");
            console.error(error);
        }
    };

    return (
        <>
            <div className="dummy"></div>
            {/* Hero Section */}
            <section
                className="py-5 text-white text-center"
                style={{
                    background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), 
                                 url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f') center/cover no-repeat`
                }}
            >
                <div className="container">
                    <h1 className="fw-bold">Contact Us</h1>
                    <p className="lead mt-3">
                        We’re here to help! Reach out with any questions or feedback.
                    </p>
                </div>
            </section>

            {/* Contact Info + Form */}
            <section className="py-5">
                <div className="container">
                    <div className="row g-5">
                        {/* Contact Info */}
                        <div className="col-lg-4 mb-2">
                            <div className="card p-4 text-center shadow-sm border-0">
                                <h5 className="fw-bold">Our Office</h5>
                                <p className="text-muted">123 LearnHub , calicut, India</p>
                                <h5 className="fw-bold mt-4">Call Us</h5>
                                <p className="text-muted">+91 98765 43210</p>
                                <h5 className="fw-bold mt-4">Email Us</h5>
                                <p className="text-muted">support@learnhub.com</p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="col-lg-8 ">
                            <h4 className="fw-bold mb-4">Send Us a Message</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Your Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Your Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            className="form-control"
                                            placeholder="Subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Message</label>
                                        <textarea
                                            name="message"
                                            className="form-control"
                                            rows="5"
                                            placeholder="Write your message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="col-12 text-end">
                                        <button type="submit" className="btn btn-primary px-4">
                                            Send Message
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="pb-5">
                <div className="container">
                    <h4 className="fw-bold mb-3 text-center">Find Us Here</h4>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d56742.93609753799!2d75.87370094538299!3d11.201348890766234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1755162298424!5m2!1sen!2sin" width="1100" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </section>
        </>
    );
}

export default ContactUs;

