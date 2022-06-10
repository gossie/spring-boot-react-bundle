import {Todo} from "../model";
import GalleryItem from "./GalleryItem";
import "./GalleryCategory.css"

interface GalleryCategoryProps {
    name: string
    todos: Todo[]
}

export default function GalleryCategory (props: GalleryCategoryProps) {
    return (
        <div className="gallery-category">
            <h2>
                {props.name}
            </h2>
            {
                props.todos
                    .map((t) => <GalleryItem key={t.id} todo={t}/>)
            }
            </div>
    )
}