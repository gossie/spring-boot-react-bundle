import {useEffect, useState} from "react";
import GalleryCategory from "./GalleryCategory";
import {Todo} from "../model";
import {getAllTasks} from "../apiService";
import {useNavigate} from "react-router-dom";
import {Box, Button, Grid, Typography} from "@mui/material";

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
            <Typography color={"textSecondary"} variant={"h3"} align={"center"} gutterBottom>
                Super Duper Beste Todo App
            </Typography>
            <Button  sx={{ ml: 2 }} variant="outlined" onClick={() => goToNewTaskPage()}>Create new todo</Button>
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