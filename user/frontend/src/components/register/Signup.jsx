import { useState } from 'react'
import '../../public/register.css'
import { useNavigate } from 'react-router'
const API = import.meta.env.VITE_API_URL;

function Signup() {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const formSubmit = async (e) => {
        e.preventDefault()
        const request = await fetch(`${API}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password })
        })
        const response = await request.json()
        if (response?.msg === 'Already Exist') {
            alert('User already exists')
        } else {
            navigate('/login')
        }
    }

    return (
        <>
            <div className="wrapper">
                <div className="row">
                    <div className="col-10 offset-1 col-lg-4 offset-lg-8">
                        <div className="signup-container">
                            <h2 className="text-center mb-4">Create Account</h2>
                            <form onSubmit={formSubmit}>
                                <div className='mb-2'>
                                    <label htmlFor="email" className="form-label">email:</label>
                                    <input type="email" name="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                                </div>
                                <div className='mb-2'>
                                    <label htmlFor="username" className="form-label">Username:</label>
                                    <input type="text" name="username" className="form-control" id="username" value={username} onChange={(e) => setUserName(e.target.value)} required></input>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="password" className="form-label">password:</label>
                                    <input type="password" name="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                                </div>
                                <button type='submit' className='w-100 p-2 border-0 mb-4 signup-btn'>Create</button>
                                <div className="w-100 d-flex justify-content-center">
                                    <a href="/login" className='text-light'>Already have a account</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Signup