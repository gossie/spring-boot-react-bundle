import {Task} from "../service/model";
import {deleteTask, demoteTask, editTask, promoteTask} from "../service/apiServices";
import {useNavigate} from "react-router-dom";

interface KanbanCardProps{
    task: Task;
    onTaskManipulation: ()=> void;
}

export default function KanbanCard(props: KanbanCardProps){

    const nav = useNavigate()

    const deleteCard = ()=>{
        deleteTask(props.task.id!)
            .then(props.onTaskManipulation)
    }

    const promoteCard = ()=>{
        promoteTask(props.task)
            .then(props.onTaskManipulation)
    }

    const demoteCard = ()=>{
        demoteTask(props.task)
            .then(props.onTaskManipulation)
    }

    const editCard = ()=>{
        editTask(props.task)
            .then(props.onTaskManipulation)
    }

    return(
        <div>
            <p>{props.task.task}</p>
            <p>{props.task.description}</p>
            {props.task.status === "OPEN" ? <button onClick={deleteCard}>Delete</button> : <button onClick={demoteCard}>Demote</button>}
            <button onClick={()=> nav("/" + props.task.id)}>Edit</button>
            {props.task.status === "DONE" ? <button onClick={deleteCard}>Delete</button> : <button onClick={promoteCard}>Promote</button>}
        </div>
    )
}