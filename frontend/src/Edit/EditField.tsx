import {Component, SetStateAction, useEffect, useState} from "react";
import {default as axios} from "axios";
import {Status} from "../model";
import {Link, useNavigate, useParams} from "react-router-dom";
import path from "path";

// interface KanbanCardProps{
//     closeEditMode: () => void;
// }

export default function EditField() {
    const axios = require("axios").default;

    const {id} = useParams();
    const [item, setItem] = useState();
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8080/api/kanban/${id}`, {method: "GET"})
            .then(response => response.json())
            .then(data => {
                setItem(data);
                setTask(data.task);
                setDescription(data.description);
                console.log(data);
            })
    }, [])

    const saveChanges = () => {

    }

    return (
        <div>
            <div>
                <label htmlFor="task">Task: </label>
                <input name="task" value={task} onChange={ev => setTask(ev.target.value)}/>
            </div>
            <div>
                <label htmlFor="description">Description: </label>
                <input name="description" value={description} onChange={ev => setDescription(ev.target.value)}/>
            </div>
            <Link to="/"><button>addTask</button></Link>
        </div>
    )
}