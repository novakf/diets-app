import React from "react";
import { Link } from "react-router-dom";
import Login from '../../components/Login'
import './styles.css'

const LoginPage = () => {
    return (
        <div className="form">
            <h1>Вход</h1>
            <Login />
            <p>
               Еще не создали аккаунт? <Link to='/register'>Зарегистрироваться</Link>
            </p>
        </div>
    )
}

export default LoginPage