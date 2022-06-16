import {FormEvent, useState} from "react";
import {createTask} from "../service/apiServices";
import "./InputForm.css"

interface InputFormProps {
    onTaskCreation: () => void;
}

export default function InputForm(props: InputFormProps) {

    const [task, setTask] = useState("")
    const [description, setDescription] = useState("")


    const submitForm = (ev: FormEvent) => {
        ev.preventDefault()
        createTask({task: task, description: description, status: "OPEN"})
            .then(() => {
                setTask("")
                setDescription("")
                props.onTaskCreation()
            })
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
            </form>
        </div>
    )
}