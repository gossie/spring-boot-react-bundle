import Header from "./components/Header";
import InputForm from "./components/InputForm";
import KanbanGallery from "./components/KanbanGallery";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {Task} from "./service/model"
import {fetchAllTasks} from "./service/apiServices";

export default function App(){

    const [tasks, setTasks] = useState<Array<Task>>([]);

    useEffect(()=>{
        fetchAll()
    },[])

    const fetchAll = ()=>{
        fetchAllTasks()
            .then((tasksFromDb:Array<Task>) => setTasks(tasksFromDb))
    }

    return(
        <div>
            <Header/>
            <InputForm onTaskCreation={fetchAll}/>
            <KanbanGallery tasks={tasks} onTaskManipulation={fetchAll}/>
        </div>
    )
}