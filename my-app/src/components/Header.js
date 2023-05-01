import {
    AppBar,
    Toolbar,
    Button
} from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";

export default function Header() {
    const displayDesktop = () => {
        return (
            <>
              
                <Toolbar>
                    {authRoutes.map(({ label, path}) => {
                        return (
                            <Button key={path} component={Link} to={path} variant="contained" color="primary">
                                {label}
                            </Button>
                        );
                    })}
                    {publicRoutes.map(({ label, path}) => {
                        return (
                            <Button key={path} component={Link} to={path} variant="contained" color="primary">
                                {label}
                            </Button>
                        );
                    })}
                </Toolbar>
            </>
        );
    };

    return (
        <AppBar>{displayDesktop()}</AppBar>
    );
}