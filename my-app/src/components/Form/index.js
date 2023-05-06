import React, { useState } from 'react'
import styled from 'styled-components'
import { Input, Button } from 'antd'

const Form = ({ title, handleClick }) => {
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')

    return (title === 'Войти') ? (
        <div>
            <StyledInput
                type='login'
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder='логин'
            />
            <StyledInput
                type='password'
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder='пароль'
            />

            <StyledButton onClick={() => handleClick(login, pass)}>
                {title}
            </StyledButton>
        </div>
    ) : (
        <div>
            <StyledInput
                type='login'
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder='логин'
            />
            <StyledInput
                type='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='имя'
            />
            <StyledInput
                type='age'
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder='возраст'
            />
            <StyledInput
                type='height'
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder='рост'
            />
            <StyledInput
                type='weight'
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder='вес'
            />
            <StyledInput
                type='password'
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder='пароль'
            />

            <StyledButton onClick={() => handleClick(login, pass, name, age, height, weight)}>
                {title}
            </StyledButton>
        </div>
    )
}

const StyledInput = styled(Input)`
    margin-bottom: 10px;
`

const StyledButton = styled(Button)`
    width: 200px;
    
`

export default Form