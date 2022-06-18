import {Todo} from "../model";
import GalleryItem from "./GalleryItem";
import {Grid, Paper, styled} from "@mui/material";

interface GalleryCategoryProps {
    name: string;
    todos: Todo[];
    fetchAll: () => void;
}

export default function GalleryCategory(props: GalleryCategoryProps) {
    return (
        <Grid item xs={4}>
            <Item>
                <h2>
                    {props.name}
                </h2>
                {
                    props.todos
                        .map((t) => <GalleryItem key={t.id} todo={t} fetchAll={props.fetchAll}/>)
                }
            </Item>
        </Grid>
    )
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1A2027',
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
