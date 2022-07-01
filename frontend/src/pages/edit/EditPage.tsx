import {useEffect, useState} from "react";
import {Task} from "../../service/model";
import {useNavigate, useParams} from "react-router-dom";
import {editTask, getTask} from "../../service/apiServices";
import "./EditPage.css"


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
            <h1 className={"headeredit"}>To-Do</h1>
            <h2 className={"headeredit"}>Edit page</h2>
            <div>
                <span className={"input"}><input className={"inputedit"} type="text" placeholder={"Task"} value={task} onChange={event => setTask(event.target.value)}/></span>
                <span className={"input"}><input className={"inputedit"} type="text" placeholder={"Description"} value={description}
                             onChange={event => setDescription(event.target.value)}/></span>
                <span className={"button"}><button onClick={saveChange}>Save</button></span>
                {errorMessage && <div className={"error"}>{errorMessage}</div>}
            </div>
        </div>
    )
}