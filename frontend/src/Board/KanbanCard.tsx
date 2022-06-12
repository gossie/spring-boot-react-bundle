import {Status, TaskItem} from "../model";
import {default as axios} from "axios";
import {useState} from "react";
import EditField from "../Edit/EditField";
import {Link, NavLink} from "react-router-dom";
import "./KanbanCard.css"

interface KanbanCardProps {
    editMode: Boolean;
    item: TaskItem
    onTaskChange: () => void;
    setEditMode: () => void;
    closeEditMode: () => void;
}

export default function KanbanCard(props: KanbanCardProps) {
    const axios = require("axios").default;


    const nextState = () => {
        axios.put("http://localhost:8080/api/kanban/next", props.item)
            .then(() => props.onTaskChange());
    }

    const prevState = async () => {
        axios.put("http://localhost:8080/api/kanban/prev", props.item)
            .then(() => props.onTaskChange());
    }

    const deleteTask = () => {
        axios.delete(`http://localhost:8080/api/kanban/${props.item.id}`)
            .then(() => props.onTaskChange());
    }


    return (
        <div>
            <span>Task: </span>{props.item.task}
            <br/>
            <span>Description: </span>{props.item.description}
            <div>
                {props.item.status === Status.OPEN?
                    <button onClick={deleteTask}>delete</button>
                :   <button onClick={prevState}>prev</button>}

                <NavLink to={`/${props.item.id}`}><button>edit</button></NavLink>
                {props.item.status !== Status.DONE && <button onClick={nextState}>next</button>}
                {props.item.status === Status.DONE && <button onClick={deleteTask}>delete</button>}
            </div>
        </div>
    )
}