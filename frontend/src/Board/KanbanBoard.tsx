import {useEffect, useState} from "react";
import {Status, TaskItem} from "../model";
import KanbanCard from "./KanbanCard";
import InputField from "../Input/InputField";
import "./KanbanBoard.css"


export default function KanbanBoard() {


    const [taskArray, setTaskArray] = useState<Array<TaskItem>>([]);

    const [editMode, setEditMode] = useState(false);

    const setToEditMode = () => {
        setEditMode(true);
    }

    const closeEditMode = () => {
        setEditMode(false);
    }


    useEffect(() => fetchTasks(), [])

    const fetchTasks = (url: string = "http://localhost:8080/api/kanban") => {
        fetch(url, {method: "GET"})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setTaskArray(data);
            })
    }

    const componentsOpen = taskArray.filter(task => task.status === Status.OPEN)
        .map(task => <KanbanCard key={task.id} item={task}
                                 onTaskChange={fetchTasks}
                                 setEditMode={setToEditMode}
                                 editMode={editMode}
                                 closeEditMode={closeEditMode}/>);

    const componentsInProgress = taskArray.filter(task => task.status === Status.IN_PROGRESS)
        .map(task => <KanbanCard key={task.id} item={task}
                                 onTaskChange={fetchTasks}
                                 setEditMode={setToEditMode}
                                 editMode={editMode}
                                 closeEditMode={closeEditMode}/>);

    const componentsDone = taskArray.filter(task => task.status === Status.DONE)
        .map(task => <KanbanCard key={task.id} item={task}
                                 onTaskChange={fetchTasks}
                                 setEditMode={setToEditMode}
                                 editMode={editMode}
                                 closeEditMode={closeEditMode}/>);

    return (
        <div>
            <div>
                <InputField onTaskChange={fetchTasks}/>
                <div className={"spaß-mit-columns"}>
                    <div>
                        <h2>OPEN</h2>
                        {componentsOpen}
                    </div>
                    <div>
                        <h2>In Progress</h2>
                        {componentsInProgress}
                    </div>
                    <div>
                        <h2>Done</h2>
                        {componentsDone}
                    </div>
                </div>

            </div>
        </div>
    )
}

