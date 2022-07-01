import {useEffect, useState} from "react";
import {Task} from "../../service/model";
import {useNavigate, useParams} from "react-router-dom";
import {editTask, getTask} from "../../service/apiServices";
import "./EditPage.css"
import Header from "../../components/Header";
import {Button, TextField} from "@mui/material";


export default function EditPage() {

    const {id} = useParams()
    const [todo, setTodo] = useState({} as Task)
    const [task, setTask] = useState("")
    const [description, setDescription] = useState("")
    const [errorMessage, setErrormessage] = useState("")

    const nav = useNavigate()

    useEffect(() => {
        if (id) {
            getTask(id)
                .then(response => response.data)
                .then(data => {
                    setTodo(data)
                    setTask(data.task)
                    setDescription(data.description)
                })
                .catch(()=> setErrormessage("The task could not be loaded"))
        }
    }, [id])

    const saveChange = () => {
        updateChange()
    }

    const updateChange = () => {
        editTask({
            'id': todo.id,
            'task': task,
            'description': description,
            'status': todo.status
        })
            .then(() => nav("/"))
    }

    return (
        <div>
            <div>
                <h1 className={"header"}>Edit-Page</h1>
            </div>
            <div>
                <span><TextField className={"inputedit"} type="text" placeholder={"Task"} value={task} onChange={event => setTask(event.target.value)}/></span>
                <br/>
                <span><TextField className={"inputedit"} type="text" placeholder={"Description"} value={description}
                             onChange={event => setDescription(event.target.value)}/></span>
                <br/>
                <span className={"button"}><Button variant={"contained"} onClick={saveChange}>Save</Button></span>
                {errorMessage && <div className={"error"}>{errorMessage}</div>}
            </div>
        </div>
    )
}