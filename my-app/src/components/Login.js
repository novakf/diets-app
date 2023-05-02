import Form from './Form'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()

    const handleLogin = (email, password) => {
        let login = email
        fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, password })
        })
            .then(response => {
                return response.text()
            })
            .then(data => {
                if (data.length > 200) {
                    window.localStorage.setItem('token', data)
                    navigate('/')
                } else {
                    alert(data)
                }
            })
    }

    return (
        <Form
            title='Войти'
            handleClick={handleLogin}
        />
    )
}

export default Login