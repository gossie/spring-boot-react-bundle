import KanbanColumn from "./KanbanColumn";
import {Task} from "../service/model"
import "./KanbanGallery.css"

interface KanbanGalleryProps{
    tasks: Array<Task>
    onTaskManipulation: ()=> void;
}

export default function KanbanGallery(props: KanbanGalleryProps){

    const openTasks = props.tasks.filter(task => task.status === "OPEN")
    const tasksInProgress = props.tasks.filter(task => task.status === "IN_PROGRESS")
    const doneTasks = props.tasks.filter(task => task.status === "DONE")


    return(
        <div className={"collumns"}>
            <div className={"open"}><KanbanColumn headline={"Open"} tasks={openTasks} onTaskManipulation={props.onTaskManipulation}/></div>
            <div className={"inpro"}><KanbanColumn headline={"In Progress"} tasks={tasksInProgress} onTaskManipulation={props.onTaskManipulation}/></div>
            <div className={"done"}><KanbanColumn headline={"Done"} tasks={doneTasks} onTaskManipulation={props.onTaskManipulation}/></div>
        </div>
    )
}