import {Component, SetStateAction, useEffect, useState} from "react";
import {default as axios} from "axios";
import {Status, TaskItem} from "../model";
import {Link, NavLink, useNavigate, useParams} from "react-router-dom";
import path from "path";
import KanbanCard from "../Board/KanbanCard";
import "./EditField.css"

export default function EditField() {
    let navigate = useNavigate();
    const axios = require("axios").default;

    const {id} = useParams();
    const [item, setItem] = useState({} as TaskItem);
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8080/api/kanban/${id}`, {method: "GET"})
            .then(response => response.json())
            .then(data => {
                setItem(data);
                setTask(data.task);
                setDescription(data.description);
            })
    }, [])

    const saveChanges = () => {
        axios.put("http://localhost:8080/api/kanban", {
            id: item.id,
            task: task,
            description: description,
            status: item.status
        })
            .then(() => navigate("/"))
    }

    return (
        <div className="edit-field">
            <div>
                <label htmlFor="task">Task: </label>
                <input name="task" value={task} onChange={ev => setTask(ev.target.value)}/>
            </div>
            <div>
                <label htmlFor="description">Description: </label>
                <input name="description" value={description} onChange={ev => setDescription(ev.target.value)}/>
            </div>
            <button onClick={saveChanges}>Edit</button>
        </div>
    )
}