import {FormEvent, useEffect, useState} from "react";
import {createTask} from "../service/apiServices";
import "./InputForm.css"

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
                    <input className={"inputfield"} type="text" value={task} placeholder={"Task"}
                           onChange={event => setTask(event.target.value)}/>
                </span>
                <span className={"input"}>
                    <input className={"inputfield"} type="text" value={description} placeholder={"Description"}
                       onChange={event => setDescription(event.target.value)}/>
                </span>
                <span className={"inputformbutton"}>
                    <input type="submit" value={"Confirm"}/>
                </span>
                {errorMessage && <span className={"error"}>{errorMessage}</span>}
            </form>
        </div>
    )
}