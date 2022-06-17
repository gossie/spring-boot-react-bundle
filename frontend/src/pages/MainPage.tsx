import Header from "../components/Header";
import InputForm from "../components/InputForm";
import KanbanGallery from "../components/KanbanGallery";
import {useEffect, useState} from "react";
import {Task} from "../service/model";
import {fetchAllTasks} from "../service/apiServices";
import "./Error.css"

export default function MainPage(){

    const [tasks, setTasks] = useState<Array<Task>>([]);
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(()=>{
        fetchAll()
    },[])

    const fetchAll = ()=>{
        fetchAllTasks()
            .then((tasksFromDb:Array<Task>) => setTasks(tasksFromDb))
            .catch(()=> setErrorMessage("The tasks could not be loaded"))
    }
    return(
        <div>
            <Header/>
            <InputForm onTaskCreation={fetchAll}/>
            {errorMessage && <div className={"error"}>{errorMessage}</div>}
            <KanbanGallery tasks={tasks} onTaskManipulation={fetchAll}/>
        </div>
    )
}