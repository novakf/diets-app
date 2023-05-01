import React from "react";
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

const HomePage = () => {
    const token = window.localStorage.getItem('token')
    const navigate = useNavigate()

    React.useEffect(() => {
        if (!token) return navigate('/login')
    })

    return token ? (
        <div>
            <h1>Welcome</h1>

            <button
                onClick={() => {
                    window.localStorage.removeItem('token')
                    navigate('/login')
                }}
            >
                Log out from {jwt_decode(token).login}
            </button>
        </div>
    ) : (
        navigate('/login')
    )
}


export default HomePage