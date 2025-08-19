
import { useNavigate } from 'react-router'
import '../../public/dashboard.css'

function Error() {
    const navigate = useNavigate()

    return (
        <>
            <div className="dummy"></div>
            <div className="d-flex justify-content-center align-items-center bg-light text-center h-100dvh">
                <div className="error-box">
                    <h1>404</h1>
                    <p>Oops! The page you're looking for doesn't exist.</p>
                    <button className="error-button" onClick={() => navigate('/')}>
                        Go to Home
                    </button>
                </div>
            </div>
        </>
    )
}

export default Error
