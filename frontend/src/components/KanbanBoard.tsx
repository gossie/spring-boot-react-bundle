import {useEffect, useState} from "react";
import GalleryCategory from "./GalleryCategory";
import {Todo} from "../model";
import {getAllTasks} from "../apiService";
import {Box, Grid} from "@mui/material";

export default function KanbanBoard () {

    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        getAllTodos();
    }, []);

    console.log("In KanbanBoard Body")

    const getAllTodos = () => {
        console.log(`fetch all todos`);
        return getAllTasks()
            .then(tds => {
                setTodos(tds);
            })
            .catch(()=>setTodos([]));
    };

    return (
        <div className="board">
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={2}>
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
                </Grid>
            </Box>
        </div>
    )
}