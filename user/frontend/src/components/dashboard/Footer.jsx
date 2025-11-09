export default function Footer() {
    return (
        <footer className="footer border-top text-light pt-5 mt-5">
            <div className="container">
                <div className="row gy-4">

                    {/* About */}
                    <div className="col-md-4 col-12">
                        <h5 className="footer-title">About LearnHub</h5>
                        <p className="footer-desc">
                            LearnHub is your gateway to quality online education.
                            Explore a variety of courses, learn at your own pace,
                            and gain skills to succeed in your career and life.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-4 col-12">
                        <h5 className="footer-title">Quick Links</h5>
                        <ul className="footer-links list-unstyled">
                            <li><a href="/">Home</a></li>
                            <li><a href="/#course-section">Courses</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="col-md-4 col-12">
                        <h5 className="footer-title">Follow Us</h5>
                        <div className="footer-social d-flex flex-wrap gap-3">
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon bi bi-facebook"></a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon bi bi-twitter-x"></a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon bi bi-instagram"></a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon bi bi-linkedin"></a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="footer-bottom text-center mt-5 pt-3 border-top border-secondary">
                    &copy; {new Date().getFullYear()} <span className="fw-bold">LearnHub</span>. All Rights Reserved.
                </div>
            </div>
        </footer>


    );
}
