import {AccountCircle, Key} from "@mui/icons-material";
import {Box, Button, Grid, InputAdornment, Link, TextField, Typography} from "@mui/material";
import {FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./AuthProvider";
import {sendLogin} from "../apiService";

export default function LoginPage() {

    const {token, login} = useAuth();

    const nav = useNavigate();

    useEffect( () => {
            if (token) {
                nav("/")
            }
        }
    , [token, nav]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        sendLogin({username, password})
            .then(r => login(r.token) )
            .then(() => nav("/userpage"));
    };

    return (
        <>
            <Typography variant={"h3"} gutterBottom>
                Login page
            </Typography>
            <Box component={"form"} onSubmit={handleSubmit} sx={{mt: 7}}>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle/>
                                    </InputAdornment>
                                ),
                            }}
                            onChange={event => setUsername(event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Password"
                            variant="outlined"
                            size="small"
                            type={"password"}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Key/>
                                    </InputAdornment>
                                ),
                            }}
                            onChange={event => setPassword(event.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{height: "39px"}}
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Link href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID}`}>
                <Box component="img"
                     alt="Github Logo"
                     src="GitHub-Mark-64px.png"
                     sx={{m: 3}}
                />
            </Link>
            <div/>
        </>
    )
}