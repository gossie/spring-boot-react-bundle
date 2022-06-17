import {Task} from "../service/model";
import {deleteTask, demoteTask, editTask, promoteTask} from "../service/apiServices";
import {useNavigate} from "react-router-dom";
import "./KanbanCard.css"
import {useState} from "react";
import "../pages/Error.css"

interface KanbanCardProps{
    task: Task;
    onTaskManipulation: ()=> void;
}

export default function KanbanCard(props: KanbanCardProps){

    const nav = useNavigate()
    const [errorMessage1, setErrorMessage1] = useState("")
    const [errorMessage2, setErrorMessage2] = useState("")
    const [errorMessage3, setErrorMessage3] = useState("")


    const deleteCard = ()=>{
        deleteTask(props.task.id!)
            .then(props.onTaskManipulation)
            .catch(()=> setErrorMessage1("The task could not be deleted"))
    }

    const promoteCard = ()=>{
        promoteTask(props.task)
            .then(props.onTaskManipulation)
            .catch(()=> setErrorMessage2("The task could not be promoted"))

    }

    const demoteCard = ()=>{
        demoteTask(props.task)
            .then(props.onTaskManipulation)
            .catch(()=> setErrorMessage3("The task could not be demoted"))

    }


    return(
        <div className={"kanbanCard"}>
            {errorMessage1 && <p className={"error"}>{errorMessage1}</p>}
            {errorMessage2 && <p className={"error"}>{errorMessage2}</p>}
            {errorMessage3 && <p className={"error"}>{errorMessage3}</p>}
            <p>{props.task.task}</p>
            <p>{props.task.description}</p>
            {props.task.status === "OPEN" ? <button onClick={deleteCard}>Delete</button> : <button onClick={demoteCard}>Demote</button>}
            <button className={"editbutton"} onClick={()=> nav("/" + props.task.id)}>Edit</button>
            {props.task.status === "DONE" ? <button onClick={deleteCard}>Delete</button> : <button onClick={promoteCard}>Promote</button>}
        </div>
    )
}