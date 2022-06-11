import {Todo} from "../model";
import "./GalleryItem.css"

interface GalleryItemProps {
    todo: Todo;
    fetchAll: ()=>void;
    editItem: (id: string)=>void;
}

export default function GalleryItem (props: GalleryItemProps) {


    function nextStatus() {
            console.log(`to next status: ${props.todo}`)

            fetch('http://localhost:8080/api/kanban/next', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(props.todo),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    props.fetchAll();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

    }

    function prevStatus() {
        console.log(`to prev status: ${props.todo}`)

        fetch('http://localhost:8080/api/kanban/prev', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(props.todo),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                props.fetchAll();
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    function deleteTodo() {
        console.log(`delete: ${props.todo}`)

        fetch(`http://localhost:8080/api/kanban/${props.todo.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(props.todo),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                props.fetchAll();
            })
            .catch((error) => {
                console.error('Error:', error);
            });

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
                <button onClick={() => props.editItem(props.todo.id)}>edit</button>
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