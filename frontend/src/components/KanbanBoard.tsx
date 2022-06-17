import "./KanbanBoard.css"
import {useEffect, useState} from "react";
import GalleryCategory from "./GalleryCategory";
import {Todo} from "../model";
import {getAllTasks} from "../apiService";
import {useNavigate} from "react-router-dom";

export default function KanbanBoard () {

    const [todos, setTodos] = useState<Todo[]>([]);

    const nav = useNavigate();

    useEffect(() => {
        getAllTodos();
    }, []);


    const getAllTodos = () => {
        console.log(`fetch all todos`);
        return getAllTasks()
            .then(tds => {
                setTodos(tds);
            });
    }

    function goToNewTaskPage(){
        nav("/new");
    }

    return (
        <div className="board">
            <h1>
                Super Duper Beste Todo App
            </h1>
            <button onClick={() => goToNewTaskPage()}>Create new todo</button>
            <div className="gallery">
                {
                    <GalleryCategory name={"Open"} todos={todos
                        .filter((t) => t.status === "OPEN")} fetchAll={getAllTodos}/>
                }
                {
                    <GalleryCategory name={"In Progress"} todos={todos
                        .filter((t) => t.status === "IN_PROGRESS")} fetchAll={getAllTodos}/>
                }
                {
                    <GalleryCategory name={"Done"} todos={todos
                        .filter((t) => t.status === "DONE")} fetchAll={getAllTodos}/>
                }
            </div>
        </div>
    )
}