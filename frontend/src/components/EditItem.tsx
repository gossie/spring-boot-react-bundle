import {useEffect, useState} from "react";
import {Todo} from "../model";
import {editTask, getTaskById} from "../apiService";
import {useNavigate, useParams} from "react-router-dom";
import EditForm from "./EditForm";

export default function EditItem () {

    const [task, setTask] = useState<Todo>();

    const [errorMsg, setErrorMsg] = useState('');

    const nav = useNavigate();
    const params = useParams();

    useEffect(() => {
        loadEditTaskFromBackend();
    }, [])

    useEffect(() => {
        setTimeout(()=>setErrorMsg(""), 5000)
    }, [errorMsg]);

    const loadEditTaskFromBackend = () => {
        console.log("loadEditTaskFromBackend")
        getTaskById(params.id!)
            .then((todo: Todo) => {
                console.log(todo);
                setTask(todo);
            })
            .catch(() => {
                nav("/");
            })

    }

    function editTodo(task: string, desc: string) {
        console.log(`editTodo: ${task} ${desc}`)

        // status is ignored from backend for edit, so I just put in any
        editTask({task: task, description: desc, status: "OPEN", id: params.id})
            .then(()=>{
                nav("/");
            })
            .catch((error) => {
                if (error.response.status===400) {
                    setErrorMsg("Make sure your input is correct (task cannot be empty).");
                } else if (error.response.status===404){
                    setErrorMsg("Something went wrong: Task to edit could not be found");
                }else{
                    setErrorMsg(error.toString);
                }
            });
    }

    return (
        <div data-testid={"edititem"}>
            <h1>Edit task</h1>
            <div>
            {
                task &&
                <EditForm taskIn={task.task} descriptionIn={task.description} setTaskAndDescription={editTodo} buttonText={"edit"}/>
            }
            </div>
            <div className="errormsg" data-testid={"erroredititem"}>
                {errorMsg}
            </div>
        </div>
    )
}