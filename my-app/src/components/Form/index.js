import React, { useState } from 'react'
import styled from 'styled-components'
import {Input, Button} from 'antd'

const Form = ({title, handleClick}) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    return (
        <div>
            <StyledInput
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='логин'
            />
            <StyledInput
                type='password'
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder='пароль'
            />

            <StyledButton onClick={() => handleClick(email, pass)}>
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