import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router'
import Signup from './components/register/Signup'
import Login from './components/register/Login'
import Home from './components/dashboard/Home'
import Classes from './components/dashboard/Classes'
import Error from './components/dashboard/Error'
import Navbar from './components/dashboard/Navbar'
import Footer from './components/dashboard/Footer'
import AboutUs from './components/dashboard/About'
import ContactUs from './components/dashboard/Contact'

function AuthLayout() {
    return (
        <>
            <Outlet />
        </>
    )
}

function MainLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

const myRouter = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/login',
                element: <Login />
            }
        ]
    },
    {
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/class/:id/:classId?',
                element: <Classes />
            },
            {
                path: '/about',
                element: <AboutUs />
            },
            {
                path: '/contact',
                element: <ContactUs />
            },
            {
                path: '*',
                element: <Error />
            }
        ]
    }
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={myRouter} />
)
