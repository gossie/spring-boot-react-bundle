import KanbanColumn from "./KanbanColumn";
import {useEffect} from "react";
import {Task} from "../service/model"

interface KanbanGalleryProps{
    tasks: Array<Task>
    onTaskManipulation: ()=> void;
}

export default function KanbanGallery(props: KanbanGalleryProps){

    const openTasks = props.tasks.filter(task => task.status === "OPEN")
    const tasksInProgress = props.tasks.filter(task => task.status === "IN_PROGRESS")
    const doneTasks = props.tasks.filter(task => task.status === "DONE")


    return(
        <div>
            <KanbanColumn headline={"Open"} tasks={openTasks} onTaskManipulation={props.onTaskManipulation}/>
            <KanbanColumn headline={"In Progress"} tasks={tasksInProgress} onTaskManipulation={props.onTaskManipulation}/>
            <KanbanColumn headline={"Done"} tasks={doneTasks} onTaskManipulation={props.onTaskManipulation}/>
        </div>
    )
}