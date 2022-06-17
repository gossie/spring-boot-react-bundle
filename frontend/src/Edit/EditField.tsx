import {Component, SetStateAction, useEffect, useState} from "react";
import {default as axios} from "axios";
import {Status, TaskItem} from "../model";
import {Link, NavLink, useNavigate, useParams} from "react-router-dom";
import path from "path";
import KanbanCard from "../Board/KanbanCard";
import "./EditField.css"

interface AppProps {
    onTaskChange: Function;
    errorFunction: Function;
}

export default function EditField(props: AppProps) {
    let navigate = useNavigate();

    const {id} = useParams();
    const [item, setItem] = useState({} as TaskItem);
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8080/api/kanban/${id}`)
            .then(response => response.data)
            .then(data => {
                setItem(data);
                setTask(data.task);
                setDescription(data.description);
            }).catch(() => {
                props.errorFunction("Could not find task id");
                navigate("/");
        })
    }, [])

    const saveChanges = () => {
        axios.put("http://localhost:8080/api/kanban", {
            id: item.id,
            task: task,
            description: description,
            status: item.status
        })
            .then(() => {
                props.onTaskChange();
            })
    }

    return (
        <div className="edit-field">
            <div>
                <label htmlFor="task">Task: </label>
                <input name="task" value={task} onChange={ev => {setTask(ev.target.value)}}/>
            </div>
            <div>
                <label htmlFor="description">Description: </label>
                <input name="description" value={description} onChange={ev => {setDescription(ev.target.value)}}/>
            </div>
            <Link to={"/"}><button onClick={saveChanges}>Edit</button></Link>
        </div>
    )
}