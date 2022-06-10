import Gallery from "./Gallery";
import "./KanbanBoard.css"
import {useState} from "react";
import EditItem from "./EditItem";

export default function KanbanBoard () {

    const [showCreate, setShowCreate] = useState<boolean>(false);

    return (
        <div className="board">
            <h1>
                Super Duper Beste Todo App
            </h1>
            {
                showCreate
                ?
                    <EditItem/>
                    :
                    <button onClick={() => setShowCreate(true)}>Create new todo</button>
            }

            <Gallery/>
        </div>
    )
}