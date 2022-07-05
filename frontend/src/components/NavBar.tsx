import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../usermanagement/AuthProvider";

export default function NavBar() {

    const {username, token, logout} = useAuth();
    const nav = useNavigate();

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    {token &&
                        <Button size={"small"} sx={{ml: 2}} variant="outlined" onClick={() => nav("/new")}>Create new todo</Button>
                    }
                    <Button color="inherit" sx={{ml: 1, mr: 2, flexGrow: 1}} onClick={() => nav("/board")}>
                        <Typography variant={"h5"} sx={{fontWeight: 600}}>
                            Out Of Brain
                        </Typography>
                    </Button>
                    {
                        token ?
                            <>
                                <Button color="inherit" size={"small"} onClick={logout}>logout</Button>
                                <Box border={1} borderRadius={2} marginLeft={1}>
                                <Typography sx={{ml:0.5, mr: 0.5}}>{username}</Typography>
                                </Box>
                            </>
                            :
                            <>
                                <Button color="inherit" size={"small"} onClick={() => nav("/login")}>Login</Button>
                                <Button color="inherit" size={"small"}
                                        onClick={() => nav("/register")}>Register</Button>
                            </>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}
