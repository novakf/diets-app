import React from "react";
import { Link } from "react-router-dom";
import SignUp from '../../components/SignUp'
import './styles.css'

const RegisterPage = () => {
    return (
        <div className="form">
            <h1>Регистрация</h1>

            <SignUp />

            <p>
                Уже есть аккаунт? <Link to='/login'>Войти</Link>
            </p>
        </div>
    )
}

export default RegisterPage