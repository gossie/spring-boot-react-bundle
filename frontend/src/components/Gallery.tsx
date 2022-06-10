import {useEffect, useState} from "react";
import {Todo} from "../model";
import GalleryCategory from "./GalleryCategory";
import "./Gallery.css"

export default function Gallery () {

    const [todos, setTodos] = useState<Todo[]>([]);

    const startUrl: string = "http://localhost:8080/api/kanban";

    useEffect(() => {
        getAllTodos();
    }, []);


    const getAllTodos = () => {
        console.log(`fetch all todos from: ${startUrl}`);
        fetch(startUrl)
            .then(response => response.json())
            .then((tds: Todo[]) => {
                setTodos(tds);
                console.log(tds);
            });
    }

    return (
            <div className="gallery">
                {
                    <GalleryCategory name={"Open"} todos={todos
                        .filter((t) => t.status === "OPEN")}/>
                }
                {
                    <GalleryCategory name={"In Progress"} todos={todos
                        .filter((t) => t.status === "IN_PROGRESS")}/>
                }
                {
                    <GalleryCategory name={"Done"} todos={todos
                        .filter((t) => t.status === "DONE")}/>
                }
            </div>
    )
}