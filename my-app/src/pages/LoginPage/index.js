import React from "react";
import { Link } from "react-router-dom";
import Login from '../../components/Login'
import './styles.css'
import { message } from "antd";

const LoginPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    return (
        <div className="form">
            {contextHolder}
            <h1>Вход</h1>
            <Login contextHolder={contextHolder}/>
            <p>
               Еще не создали аккаунт? <Link to='/register'>Зарегистрироваться</Link>
            </p>
        </div>
    )
}

export default LoginPage