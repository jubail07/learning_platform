export default function Footer() {
    return (
        <footer className="footer border-top text-light pt-4 mt-5">
            <div className="container">
                <div className="row text-center text-md-left">
                    
                    {/* About */}
                    <div className="col-md-4 mb-4">
                        <h5 className="text-uppercase mb-3">About LearnHub</h5>
                        <p>
                            LearnHub is your gateway to quality online education.  
                            Explore a variety of courses, learn at your own pace,  
                            and gain skills to succeed in your career and life.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="col-md-4 mb-4">
                        <h5 className="text-uppercase mb-3">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-light">Home</a></li>
                            <li><a href="/#course-section" className="text-light">Courses</a></li>
                            <li><a href="/about" className="text-light">About Us</a></li>
                            <li><a href="/contact" className="text-light">Contact</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="col-md-4 mb-4">
                        <h5 className="text-uppercase mb-3">Follow Us</h5>
                        <div className="d-flex justify-content-center justify-content-md-start flex-column">
                            <a href="https://facebook.com" className="text-light">facebook</a>
                            <a href="https://twitter.com" className="text-light">twitter</a>
                            <a href="https://instagram.com" className="text-light">instagram</a>
                            <a href="https://linkedin.com" className="text-light">Linkedin</a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="text-center py-3 border-top border-secondary mt-4">
                    &copy; {new Date().getFullYear()} LearnHub. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}
