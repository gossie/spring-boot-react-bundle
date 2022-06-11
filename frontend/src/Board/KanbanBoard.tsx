import {useEffect, useState} from "react";
import {TaskItem, TaskItemArray} from "../model";
import KanbanCard from "./KanbanCard";
import InputField from "../Input/InputField";


export default function KanbanBoard() {


    const [taskArray, setTaskArray] = useState<Array<TaskItem>>([]);


    useEffect(() => fetchTasks(), [])

    const fetchTasks = (url: string = "http://localhost:8080/api/kanban") => {
        fetch(url, {method: "GET"})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setTaskArray(data);
            })
    }

    const components = taskArray.map(task => <KanbanCard key={task.id} item={task} onTaskChange={fetchTasks}/>);

    return (
        <div>
            <InputField onTaskChange={fetchTasks}/>
            <div>
                {components}
            </div>
        </div>
    )
}

