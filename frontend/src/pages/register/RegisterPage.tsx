import {Button, TextField} from "@mui/material";
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {registerUser} from "../../service/apiServices";
import Header from "../../components/Header";


export default function RegisterPage(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const nav = useNavigate()

    function register(formEvent: FormEvent){
        formEvent.preventDefault()
        registerUser(username, password)
            .then(()=> nav("/login"))
    }

    return(
        <div>
            <Header/>
            <div>
                <h2 className={"header"}>Register Page</h2>
            </div>
            <div>
                <form onSubmit={register}>
                    <span className={"input"}>
                        <TextField  label="Username" variant="outlined" className={"inputfield"} type="text" value={username}
                                    onChange={event => setUsername(event.target.value)}/>
                    </span>
                        <span className={"input"}>
                        <TextField type={"password"} label="Password" variant="outlined" value={password}
                                   onChange={event => setPassword(event.target.value)}/>
                    </span>
                        <span className={"input"}>
                        <Button variant="contained" type="submit">Confirm</Button>
                    </span>
                    <div className={"input"}>
                        <Button onClick={()=>nav("/")} variant="contained">Back</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}