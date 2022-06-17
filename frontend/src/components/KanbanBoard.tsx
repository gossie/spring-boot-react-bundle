import "./KanbanBoard.css"
import {useEffect, useState} from "react";
import EditItem from "./EditItem";
import GalleryCategory from "./GalleryCategory";
import {Todo} from "../model";
import {getAllTasks} from "../apiService";

export default function KanbanBoard () {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [editMode, setEditMode] = useState<string>("view");
    const [editId, setEditId] = useState<string>("")

    const startUrl: string = "http://localhost:8080/api/kanban";

    useEffect(() => {
        getAllTodos();
    }, []);


    const getAllTodos = () => {
        console.log(`fetch all todos from: ${startUrl}`);
        return getAllTasks()
            .then((tds: Todo[]) => {
                setTodos(tds);
                console.log(tds);
            });
    }

    function editItem(id: string) {
        setEditId(id);
        setEditMode("edit");
    }

    return (
        <div className="board">
            <h1>
                Super Duper Beste Todo App
            </h1>
            {
                editMode === "view" &&
                <button onClick={() => setEditMode("new")}>Create new todo</button>
            }
            {
                editMode === "edit" &&
                <EditItem editId={editId} editMode="edit" fetchAll={getAllTodos} setEditMode={setEditMode}/>
            }
            {
                editMode === "new" &&
                <EditItem editId="" editMode="new" fetchAll={getAllTodos} setEditMode={setEditMode}/>
            }

            <div className="gallery">
                {
                    <GalleryCategory name={"Open"} editItem={editItem} todos={todos
                        .filter((t) => t.status === "OPEN")} fetchAll={getAllTodos}/>
                }
                {
                    <GalleryCategory name={"In Progress"} editItem={editItem} todos={todos
                        .filter((t) => t.status === "IN_PROGRESS")} fetchAll={getAllTodos}/>
                }
                {
                    <GalleryCategory name={"Done"} editItem={editItem} todos={todos
                        .filter((t) => t.status === "DONE")} fetchAll={getAllTodos}/>
                }
            </div>
        </div>
    )
}