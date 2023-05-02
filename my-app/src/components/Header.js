import React from "react";
import styled from 'styled-components'
import {
    AppBar,
    Toolbar,
    Button
} from "@mui/material";
import { Link } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";

const Header = () => {
    return (
        <AppBar>
            <StyledToolBar>
                {authRoutes.map(({ label, path }) => {
                    return (
                        <Button key={path} component={Link} to={path} variant="contained" color="primary">
                            {label}
                        </Button>
                    );
                })}
                <Button component={Link} to='/login' variant="contained" color="primary">
                    Выйти
                </Button>
            </StyledToolBar>
        </AppBar>
    )
}

const StyledToolBar = styled(Toolbar)`
    background-color: white;
`

export default Header