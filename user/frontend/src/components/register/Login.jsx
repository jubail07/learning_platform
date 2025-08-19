import { useState } from 'react'
import '../../public/register.css'
import { useNavigate } from 'react-router'

function Login() {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const formSubmit = async (e) => {
        e.preventDefault()
        const request = await fetch(`http://localhost:3000/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        })
        if (request.status === 403) {
            return navigate('/')
        }
        const response = await request.json()
        if (response?.msg === 'invalid, please try again') {
            alert('invalid password or username, please try again')
        } else {
            navigate('/')
        }
    }

    return (
        <>
            <div className="login-wrapper">
                <div className="login-container mt-5">
                    <h2 className="text-center mb-4">Login</h2>
                    <form onSubmit={formSubmit}>
                        <div className='mb-2'>
                            <label htmlFor="username" className="form-label">Username:</label>
                            <input type="text" name="username" className="form-control" id="username" value={username} onChange={(e) => setUserName(e.target.value)} required></input>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="password" className="form-label">password:</label>
                            <input type="password" name="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                        </div>
                        <button type='submit' className='w-100 p-2 border-0 mb-4 signup-btn' >Login</button>
                        <div className="w-100 d-flex justify-content-center">
                            <a href="/signup" className='text-dark'>create a accout</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Login