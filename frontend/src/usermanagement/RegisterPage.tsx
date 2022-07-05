import {Box, Button, Grid, InputAdornment, TextField, Typography} from "@mui/material";
import {FormEvent, useState} from "react";
import {
    AccountCircle, Key
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {sendRegister} from "../apiService";

export default function RegisterPage(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");

    const nav = useNavigate();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        sendRegister({username, password, passwordAgain})
            .then(()=>nav("/login"));
    };

    return (
        <>
            <Typography variant={"h1"} gutterBottom>
                Register page
            </Typography>
            <Box component={"form"} onSubmit={handleSubmit} >
                <Grid container alignItems="center" spacing={2} direction="row">
                    <Grid item>
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
                    <Grid item>
                        <TextField
                            label="Password"
                            variant="outlined"
                            size="small"
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
                    <Grid item>
                        <TextField
                            label="Password again"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Key/>
                                    </InputAdornment>
                                ),
                            }}
                            onChange={event => setPasswordAgain(event.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{height: "39px"}}
                        >
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}