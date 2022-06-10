import {Todo} from "../model";
import GalleryItem from "./GalleryItem";
import "./GalleryCategory.css"

interface GalleryCategoryProps {
    name: string;
    todos: Todo[];
    fetchAll: ()=>void;
    editItem: (id: string)=>void;
}

export default function GalleryCategory (props: GalleryCategoryProps) {
    return (
        <div className="gallery-category">
            <h2>
                {props.name}
            </h2>
            {
                props.todos
                    .map((t) => <GalleryItem editItem={props.editItem} key={t.id} todo={t} fetchAll={props.fetchAll}/>)
            }
            </div>
    )
}