import Form from './Form'
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
    const navigate = useNavigate()

    const handleRegister = (email, password) => {
        let login = email
        fetch('http://localhost:3001/auth/register', {
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
            title='Зарегистрироваться'
            handleClick={handleRegister}
        />
    )
}

export default SignUp