import Admin from './pages/Admin'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

export const authRoutes = [
    {
        label: 'admin',
        path: '/admin',
        Component: Admin
    }
]

export const publicRoutes = [
    {
        label: 'home',
        path: '/',
        Component: HomePage
    }, {
        label: 'Sign up',
        path: '/register',
        Component: RegisterPage
    },
    {
        label: 'Login',
        path: '/login',
        Component: LoginPage
    }

]