import {Status, TaskItem} from "../model";
import {default as axios} from "axios";
import {useState} from "react";
import EditField from "../Edit/EditField";
import {Link, NavLink} from "react-router-dom";
import "./KanbanCard.css"

interface KanbanCardProps {
    item: TaskItem
    onTaskChange: Function;
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
        <div className={"card"} data-testid={props.item.id}>
            <span>Task: </span>{props.item.task}
            <br/>
            <span>Description: </span>{props.item.description}
            <div>
                {props.item.status === Status.OPEN?
                    <button onClick={deleteTask}><i className="fa-solid fa-trash-can"></i></button>
                :   <button onClick={prevState}><i className="fa-solid fa-arrow-left-long fa-lg"></i></button>}

                <NavLink to={`/${props.item.id}`}><button><i className="fa-solid fa-pen-to-square"></i></button></NavLink>
                {props.item.status !== Status.DONE && <button onClick={nextState}><i className="fa-solid fa-arrow-right-long fa-lg"></i></button>}
                {props.item.status === Status.DONE && <button onClick={deleteTask}><i className="fa-solid fa-trash-can"></i></button>}
            </div>
        </div>
    )
}