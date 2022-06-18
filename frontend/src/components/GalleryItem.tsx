import {Todo} from "../model";
import {deleteTask, moveTaskToNext, moveTaskToPrev} from "../apiService";
import {useNavigate} from "react-router-dom";

interface GalleryItemProps {
    todo: Todo;
    fetchAll: ()=>void;
}

export default function GalleryItem (props: GalleryItemProps) {

    const nav = useNavigate();

    function nextStatus() {
        console.log(`to next status: ${props.todo}`)
        moveTaskToNext(props.todo)
            .then(props.fetchAll)
            .catch((error) => console.error('Error:', error));
    }

    function prevStatus() {
        console.log(`to prev status: ${props.todo}`)
        moveTaskToPrev(props.todo)
            .then(props.fetchAll)
            .catch((error) => console.error('Error:', error));
    }

    function deleteTodo() {
        console.log(`delete: ${props.todo}`)

        deleteTask(props.todo.id!)
            .then(props.fetchAll)
            .catch((error) => console.error('Error:', error));
    }

    return (
        <div className="item">
                <h2>{props.todo.task}</h2>
                <p>
                    Description: {props.todo.description}
                </p>
            {
                (props?.todo?.status === "DONE" || props?.todo?.status==="IN_PROGRESS") &&
                <button onClick={() => prevStatus()}>prev</button>
            }
            {
                <button onClick={() => nav(`/edit/${props.todo.id}`)}>edit</button>
            }
            {
                (props?.todo?.status === "OPEN" || props?.todo?.status==="IN_PROGRESS") &&
                <button onClick={() => nextStatus()}>next</button>
            }
            {
                props?.todo?.status === "DONE" &&
                <button onClick={() => deleteTodo()}>delete</button>
            }
        </div>
    )
}