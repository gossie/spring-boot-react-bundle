import {Todo} from "../model";
import "./GalleryItem.css"

interface GalleryItemProps {
    todo: Todo
}

export default function GalleryItem (props: GalleryItemProps) {
    return (
        <div className="item">
                <h2>{props.todo.task}</h2>
                <p>
                    Description: {props.todo.description}
                </p>
        </div>
    )
}