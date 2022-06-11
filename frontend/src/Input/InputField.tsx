import {useState} from "react";
import {Status, TaskItem} from "../model";

interface KanbanCardProps {
    onTaskChange: () => void;
}

export default function InputField(props: KanbanCardProps) {
    const axios = require("axios").default;

    const [inputTask, setTask] = useState("");
    const [inputDescription, setDescription] = useState("");

    const sendTask = () => {
        axios.post("http://localhost:8080/api/kanban", {
            task: inputTask,
            description: inputDescription,
            status: Status.OPEN
        })
            .then(() => props.onTaskChange());
    }

    return (
        <div>
            <div>
                <label htmlFor="task">Task: </label>
                <input name="task" value={inputTask} onChange={ev => setTask(ev.target.value)}/>
            </div>
            <div>
                <label htmlFor="description">Description: </label>
                <input name="description" value={inputDescription} onChange={ev => setDescription(ev.target.value)}/>
            </div>
            <button onClick={sendTask}>addTask</button>
        </div>
    )
}