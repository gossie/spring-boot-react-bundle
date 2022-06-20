import {Component, SetStateAction, useEffect, useState} from "react";
import {default as axios} from "axios";
import {Status, TaskItem} from "../model";
import {Link, NavLink, useNavigate, useParams} from "react-router-dom";
import path from "path";
import KanbanCard from "../Board/KanbanCard";
import "./EditField.css"
import {useTranslation} from "react-i18next";
import {editTask, getTaskById} from "../API_services/services";

interface AppProps {
    onTaskChange: Function;
    errorFunction: Function;
}

export default function EditField(props: AppProps) {
    let navigate = useNavigate();
    const {t} = useTranslation()

    const {id} = useParams();
    const [item, setItem] = useState({} as TaskItem);
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        getTaskById(id!)
            .then(response => response.data)
            .then(data => {
                setItem(data);
                setTask(data.task);
                setDescription(data.description);
            }).catch(() => {
            props.errorFunction("Could not find task id");
            navigate("/");
        })
    }, [])

    const saveChanges = () => {
         const editedTask: TaskItem = {
            id: item.id,
            task: task,
            description: description,
            status: item.status
        }
        editTask(editedTask)
            .then(() => {
                props.onTaskChange();
            })
    }

    return (
        <div className={"editField-wrapper"}>
            <div className="edit-field">
                <form onSubmit={() => {
                    saveChanges();
                    navigate("/");
                }}>
                    <div className={"edit-wrapper"}>
                        <div className={"editField-label-box"}>
                            <label className={"edit-label"} htmlFor="task">{t("inputField-task")}:</label>
                            <label className={"edit-label"} htmlFor="description">{t("inputField-description")}: </label>
                        </div>
                        <div className={"editField-input-box"}>
                            <input className={"edit-input"} name="task" value={task} onChange={ev => {setTask(ev.target.value)}}/>
                            <input className={"edit-input"} name="description" value={description} onChange={ev => {setDescription(ev.target.value)}}/>
                        </div>
                    </div>
                    <div className={"edit-button-div"}>
                        <button type={"submit"}>{t("edit-button")}</button>
                    </div>
                </form>

            </div>
        </div>

    )
}