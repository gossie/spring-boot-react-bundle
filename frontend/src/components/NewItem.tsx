import {useEffect, useState} from "react";
import "./EditItem.css"
import {createNewTask} from "../apiService";
import EditForm from "./EditForm";
import {useNavigate} from "react-router-dom";

export default function NewItem () {

    const [errorMsg, setErrorMsg] = useState('')

    const nav = useNavigate();

    useEffect(() => {
        setTimeout(()=>setErrorMsg(""), 5000)
    }, [errorMsg]);

    const addNewTodo = (task: string, desc: string) => {
        console.log(`saving: ${task} ${desc}`)
        createNewTask({task: task, description: desc, status: "OPEN"})
            .then(() => nav("/"))
            .catch((error) => {
                if(error.response.status===400){
                    setErrorMsg("Make sure your input is correct (task cannot be empty).");
                }else{
                    setErrorMsg(error.toString);
                }
            });
    }

    return (
        <div>
            <h1>Create new task</h1>
            <EditForm taskIn={localStorage.getItem("newItemTaskField")??""} descriptionIn={localStorage.getItem("newItemDescField")??""} setTaskAndDescription={addNewTodo} buttonText={"send"}/>
            <div className="errormsg">
                {errorMsg}
            </div>
        </div>
    )
}