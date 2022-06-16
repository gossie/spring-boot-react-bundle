import {useEffect, useState} from "react";
import {Task} from "../service/model";
import {useNavigate, useParams} from "react-router-dom";
import {editTask, getTask} from "../service/apiServices";


export default function EditPage(){

    const {id} = useParams()
    const [todo, setTodo] = useState({} as Task)
    const [task, setTask] = useState("")
    const [description, setDescription] = useState("")

    const nav = useNavigate()

    useEffect(()=>{
        if (id){
            getTask(id)
                .then(response => response.data)
                .then(data =>{
                    setTodo(data)
                    setTask(data.task)
                    setDescription(data.description)
                })
        }
    },[id])

    const saveChange = ()=>{
        updateChange()
    }

    const updateChange = ()=>{
        editTask({
            'id' : todo.id,
            'task' : task,
            'description' : description,
            'status' : todo.status
        })
            .then(()=> nav("/"))
    }

    return(
        <div>
            <h1>To-Do</h1>
            <h2>{id}</h2>
            <div>
                <input type="text" placeholder={"Task"} value={task} onChange={event => setTask(event.target.value)}/>
                <input type="text" placeholder={"Description"} value={description} onChange={event => setDescription(event.target.value)}/>
                <button onClick={saveChange}>Save</button>
            </div>
        </div>
    )
}