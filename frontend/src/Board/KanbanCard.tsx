import {Status, TaskItem} from "../model";
import {default as axios} from "axios";

interface KanbanCardProps {
    item: TaskItem
    onTaskChange: () => void;
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

    const editTask = () => {

    }

    return (
        <div>
            <span>Task: </span>{props.item.task}
            <br/>
            <span>Description: </span>{props.item.description}
            <div>
                {props.item.status === Status.OPEN && <button onClick={deleteTask}>delete</button>}
                {props.item.status !== Status.OPEN && <button onClick={prevState}>prev</button>}
                <button onClick={editTask}>edit</button>
                {props.item.status !== Status.DONE && <button onClick={nextState}>next</button>}
                {props.item.status === Status.DONE && <button onClick={deleteTask}>delete</button>}
            </div>
        </div>
    )
}