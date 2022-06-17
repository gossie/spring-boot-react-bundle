import {useEffect, useState} from "react";
import {Todo} from "../model";
import "./EditItem.css"
import {createNewTask, editTask, getTaskById} from "../apiService";

interface EditItemProps {
    fetchAll: () => Promise<any>;
    editMode: string;
    setEditMode: (input: string) => void;
    editId: string;
}

export default function EditItem (props: EditItemProps) {

    const [task, setTask] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [status, setStatus] = useState<string>("");

    const [errorMsg, setErrorMsg] = useState('')


    useEffect(() => {
        setTimeout(()=>setErrorMsg(""), 5000)
    }, [errorMsg]);

    useEffect(()=>{
        if(props.editMode === "edit"){
            getTaskById1();
        }
    }, [props])

    const getTaskById1 = () => {
        console.log(`fetch todo by id`);
        getTaskById(props.editId)
            .then((todo: Todo) =>{
                setTask(todo.task);
                setDescription(todo.description);
                setStatus(todo.status);
                console.log(todo);
            })
    }

    const addNewTodo = () => {
        console.log(`saving: ${task} ${description}`)
        createNewTask({task: task, description: description, status: "OPEN"})
            .then(()=>props.fetchAll())
            .then(()=>props.setEditMode("view"))
            .catch((error) => {
                if(error.response.status===422){
                    setErrorMsg("Make sure your input is correct (task cannot be empty).");
                }else{
                    setErrorMsg(error.toString);
                }
            });
    }

    function editTodo() {
        console.log(`edit: ${task} ${description}`)

        editTask({task: task, description: description, status: status, id: props.editId})
            .then(()=>props.fetchAll())
            .then(()=>props.setEditMode("view"))
            .catch((error) => {
                if (error.response.status===422) {
                    setErrorMsg("Make sure your input is correct (task cannot be empty).");
                } else if (error.response.status===404){
                    setErrorMsg("Something went wrong: Task to edit could not be found");
                }else{
                    setErrorMsg(error.toString);
                }
            });
    }

    function cancel() {
        props.setEditMode("view");
    }

    return (
        <div>

            <label htmlFor="task">{"           "}Task: </label>
            <input id="task" type="text" value={task}
                   onChange={ev => {
                       setTask(ev.target.value)
                       console.log(`set task to ${ev.target.value}`)
                   }}/>
            <br/>
            <label htmlFor="desc">Description: </label>
            <input id="desc" type="text" value={description}
                   onChange={ev => {
                       setDescription(ev.target.value)
                       console.log(`set description to ${ev.target.value}`)
                   }}/>
            <br/>
            <button onClick={() => cancel()}>cancel</button>
            {
                props.editMode === "new" &&
                <button onClick={() => addNewTodo()}>save</button>
            }
            {
                props.editMode === "edit" &&
                <button onClick={() => editTodo()}>edit</button>
            }
            <div className="errormsg">
                {errorMsg}
            </div>
            {/*<div className="inputalign">*/}
            {/*    <label htmlFor="task">{"           "}Task: </label>*/}
            {/*    <input id="task" type="text" value={task}*/}
            {/*           onChange={ev => {*/}
            {/*               setTask(ev.target.value)*/}
            {/*               console.log(`set task to ${ev.target.value}`)*/}
            {/*           }}/>*/}
            {/*    <label htmlFor="desc">Description: </label>*/}
            {/*    <input id="desc" type="text" value={description}*/}
            {/*           onChange={ev => {*/}
            {/*               setDescription(ev.target.value)*/}
            {/*               console.log(`set description to ${ev.target.value}`)*/}
            {/*           }}/>*/}
            {/*    <button onClick={() => cancel()}>cancel</button>*/}
            {/*    {*/}
            {/*        props.editMode === "new" &&*/}
            {/*        <button onClick={() => addNewTodo()}>save</button>*/}
            {/*    }*/}
            {/*    {*/}
            {/*        props.editMode === "edit" &&*/}
            {/*        <button onClick={() => editTodo()}>edit</button>*/}
            {/*    }*/}
            {/*</div>*/}
        </div>
    )
}