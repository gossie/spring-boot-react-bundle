import "./Header.css"
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function Header(){

    const nav = useNavigate()

    return(
        <div>
            <h1 className={"header"}>ToDo-App</h1>
            <div className={"input"}>
                <Button onClick={()=> nav("/")} variant={"contained"} size={"small"}>Home</Button>
            </div>
        </div>
    )
}