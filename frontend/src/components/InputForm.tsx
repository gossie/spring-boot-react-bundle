import {FormEvent, useState} from "react";
import axios from "axios";
import {createTask} from "../service/apiServices";

interface InputFormProps{
    onTaskCreation: ()=> void;
}

export default function InputForm(props: InputFormProps){

    const [task, setTask] = useState("")
    const [description, setDescription] = useState("")


    const submitForm = (ev: FormEvent)=>{
        ev.preventDefault()
        createTask({task: task, description: description, status: "OPEN"})
            .then(()=>{
                setTask("")
                setDescription("")
                props.onTaskCreation()
            })
    }

    return(
        <div>
            <form onSubmit={submitForm}>
                <input type="text" value={task} placeholder={"Task"} onChange={event => setTask(event.target.value)}/>
                <input type="text" value={description} placeholder={"Description"} onChange={event => setDescription(event.target.value)}/>
                <input type="submit" value={"Confirm"}/>
            </form>
        </div>
    )
}