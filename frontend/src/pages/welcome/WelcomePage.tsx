import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";


export default function WelcomePage(){

    const nav = useNavigate()

    return(
        <div>
            Welcome!
            <div>
                <Button onClick={()=>nav("/login")}>Login</Button>
                <Button onClick={()=>nav("/register")}>Register</Button>
            </div>
        </div>
    )
}