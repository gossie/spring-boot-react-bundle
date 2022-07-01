import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Header from "../../components/Header";


export default function WelcomePage(){

    const nav = useNavigate()

    return(
        <div>
            <Header/>
            <div>
                <div className={"input"}>
                    <Button variant={"contained"} onClick={()=>nav("/login")}>Login</Button>
                </div>
                <div className={"input"}>
                    <Button variant={"contained"} onClick={()=>nav("/register")}>Register</Button>
                </div>
            </div>
        </div>
    )
}