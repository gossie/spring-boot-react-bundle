import {Todo} from "../model";
import {deleteTask, moveTaskToNext, moveTaskToPrev} from "../apiService";
import {useNavigate} from "react-router-dom";
import {Button, Card, CardContent, Typography} from "@mui/material";

interface GalleryItemProps {
    todo: Todo;
    fetchAll: () => void;
}

export default function GalleryItem(props: GalleryItemProps) {

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
        <Card sx={{m: 1}}>
            <CardContent>
                <Typography color="textSecondary" variant="h5">
                    {props.todo.task}
                </Typography>
                <Typography color="textSecondary" variant="subtitle2">
                    Description: {props.todo.description}
                </Typography>

                {
                    (props?.todo?.status === "DONE" || props?.todo?.status === "IN_PROGRESS") &&
                    <Button sx={{mt:0.5}} variant="outlined" size={"small"} onClick={() => prevStatus()}>prev</Button>
                }
                {
                    <Button sx={{mt:0.5}} variant="outlined" size={"small"} onClick={() => nav(`/edit/${props.todo.id}`)}>edit</Button>
                }
                {
                    (props?.todo?.status === "OPEN" || props?.todo?.status === "IN_PROGRESS") &&
                    <Button sx={{mt:0.5}} variant="outlined" size={"small"} onClick={() => nextStatus()}>next</Button>
                }
                {
                    props?.todo?.status === "DONE" &&
                    <Button sx={{mt:0.5}} variant="outlined" size={"small"} onClick={() => deleteTodo()}>delete</Button>
                }
            </CardContent>
        </Card>
    )
}