import { Link, useNavigate, useLocation } from 'react-router'
const API = import.meta.env.VITE_API_URL;

function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()

    const isActive = (path) => location.pathname === path ? "active" : ""

    const closeNavbar = () => {
        const navbar = document.getElementById("navbarNavAltMarkup")
        if (navbar && navbar.classList.contains("show")) {
            navbar.classList.remove("show")
        }
    }

    const logout = async () => {
        try {
            const response = await fetch(`${API}/user/logout`, {
                method: 'GET',
                credentials: 'include'
            })
            if (response.ok) {
                navigate('/login')
            }
        } catch (error) {
            console.log(error, 'error in frontend logout')
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top nav-custom align-items-end">
                <a className="navbar-brand" href="/">
                    <h3 className="navbar-brand bg-transparent font-weight-bold nav-head-clr"> <img className='bg-transparent logo' src="/logo_icon.png" alt="learnHub_logo"/> LearnHub</h3>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"> <i className="bi bi-list nav-clr"></i></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className={`nav-link font-weight-bolder nav-clr ${isActive("/")}`} to="/" onClick={closeNavbar}>Home</Link>
                        <Link className={`nav-link font-weight-bolder nav-clr ${isActive("/about")}`} to="/about" onClick={closeNavbar}>About</Link>
                        <Link className={`nav-link font-weight-bolder nav-clr ${isActive("/contact")}`} to="/contact" onClick={closeNavbar}>Contact</Link>
                        <button className="nav-link btn font-weight-bolder nav-clr" onClick={logout}>Logout</button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
