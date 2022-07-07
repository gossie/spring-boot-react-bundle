import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Input} from "@mui/material";

interface EditFormProps {
    taskIn: string;
    descriptionIn: string;
    setTaskAndDescription: (task: string, description: string) => void;
    buttonText: string;
}


export default function EditForm(props: EditFormProps){

    const [task, setTask] = useState(props.taskIn);
    const [description, setDescription] = useState(props.descriptionIn);

    useEffect(()=>{
        localStorage.setItem('newItemTaskField', task);
    },[task]);

    useEffect(()=>{
        localStorage.setItem('newItemDescField', description);
    },[description]);

    const nav = useNavigate();

    const cancel = () => {
        nav("/");
    };

return (
    <div>

        <label htmlFor="task">{"           "}Task: </label>
        <Input id="task" type="text" value={task} data-testid={"taskinput"}
               onChange={ev => {
                   setTask(ev.target.value)
               }}/>
        <br/>
        <label htmlFor="desc">Description: </label>
        <Input id="desc" type="text" value={description} data-testid={"descinput"}
               onChange={ev => {
                   setDescription(ev.target.value)
               }}/>
        <br/>
        <Button onClick={() => {
            localStorage.removeItem("newItemTaskField");
            localStorage.removeItem("newItemDescField");
            cancel();
        }}>cancel</Button>
        <Button onClick={() => {
            localStorage.removeItem("newItemTaskField");
            localStorage.removeItem("newItemDescField");
            props.setTaskAndDescription(task, description);
        }} data-testid={"editformsubmit"}>{props.buttonText}</Button>
    </div>
)
}