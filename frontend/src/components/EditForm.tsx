import {useState} from "react";
import {useNavigate} from "react-router-dom";

interface EditFormProps {
    taskIn: string;
    descriptionIn: string;
    setTaskAndDescription: (task: string, description: string) => void;
    buttonText: string;
}


export default function EditForm(props: EditFormProps){

    const [task, setTask] = useState(props.taskIn);
    const [description, setDescription] = useState(props.descriptionIn);

    const nav = useNavigate();

    const cancel = () => {
        nav("/");
    }

return (
    <div>

        <label htmlFor="task">{"           "}Task: </label>
        <input id="task" type="text" value={task} data-testid={"taskinput"}
               onChange={ev => {
                   setTask(ev.target.value)
               }}/>
        <br/>
        <label htmlFor="desc">Description: </label>
        <input id="desc" type="text" value={description} data-testid={"descinput"}
               onChange={ev => {
                   setDescription(ev.target.value)
               }}/>
        <br/>
        <button onClick={() => cancel()}>cancel</button>
        <button onClick={() => props.setTaskAndDescription(task, description)} data-testid={"editformsubmit"}>{props.buttonText}</button>
    </div>
)
}