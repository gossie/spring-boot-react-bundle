import {Box, CircularProgress, Typography} from "@mui/material";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { githubOauthRequest } from "../apiService";
import {useAuth} from "./AuthProvider";


export default function OauthPage() {
    const nav = useNavigate();
    const loc = useLocation();
    const code = loc.search;
    const {login} = useAuth();

    useEffect(()=>{
            githubOauthRequest(code)
                .then(r => login(r.token))
                .then(()=>nav("/board"))
                .catch((e)=>{
                    console.log(e);
                    }
                );
        }
    , [nav, code, login]);

    return (
        <>
            <Typography variant={"h3"}>
                Oauth sign in
            </Typography>

            <Box sx={{mt: 5}}>
                <CircularProgress/>
            </Box>
        </>
    )
}