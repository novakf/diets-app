import React from "react";
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import Menu from '../components/SelectDiet/Menu'

const HomePage = () => {
    const token = window.localStorage.getItem('token')
    const navigate = useNavigate()

    React.useEffect(() => {
        if (!token) navigate('/login')
    })

    return token && (
        <div>
            
            <h1>Привет, {jwt_decode(token).name ? jwt_decode(token).name : 'Незнакомец'}!</h1>

            <h2>Выбери рацион:</h2>

            <Menu />
        </div>)
}


export default HomePage