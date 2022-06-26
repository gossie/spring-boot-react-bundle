import {FormEvent, useEffect, useState} from "react";
import {createTask} from "../service/apiServices";
import "./InputForm.css"
import {Button, TextField} from "@mui/material";

interface InputFormProps {
    onTaskCreation: () => void;
}

export default function InputForm(props: InputFormProps) {

    const [task, setTask] = useState(localStorage.getItem("task") ?? "")
    const [description, setDescription] = useState(localStorage.getItem("des") ?? "")
    const [errorMessage, setErrorMessage] = useState("")



    useEffect(()=>{
        localStorage.setItem("task", task)
    },[task])

    useEffect(()=>{
        localStorage.setItem("des", description)
    },[description])


    const submitForm = (ev: FormEvent) => {
        ev.preventDefault()
        createTask({task: task, description: description, status: "OPEN"})
            .then(() => {
                setTask("")
                setDescription("")
                props.onTaskCreation()
            })
            .catch(()=> setErrorMessage("The task could not be crated"))
    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <span className={"input"}>
                    <TextField  label="Task" variant="outlined" className={"inputfield"} type="text" value={task}
                           onChange={event => setTask(event.target.value)}/>
                </span>
                <span className={"input"}>
                    <TextField label="Description" variant="outlined" value={description}
                       onChange={event => setDescription(event.target.value)}/>
                </span>
                <span className={"inputformbutton"}>
                    <Button variant="contained" type="submit">Confirm</Button>
                </span>
                {errorMessage && <span className={"error"}>{errorMessage}</span>}
            </form>
        </div>
    )
}