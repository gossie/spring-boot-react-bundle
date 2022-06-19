import {FormEvent, useEffect, useState} from "react";
import {Status, TaskItem} from "../model";
import "./InputField.css"
import axios, {AxiosError} from "axios";
import {useTranslation} from "react-i18next";

interface AppProps {
    onTaskChange: () => void;
    errorFunction:  Function;
}

export default function InputField(props: AppProps) {

    const [inputTask, setTask] = useState(localStorage.getItem("task") ?? "");
    const [inputDescription, setDescription] = useState(localStorage.getItem("description") ?? "");
    const {t} = useTranslation();

    useEffect(() => {
        localStorage.setItem("task", inputTask)
        localStorage.setItem("description", inputDescription)
    }, [inputTask, inputDescription])

    const sendTask = (ev: FormEvent) => {
        ev.preventDefault();
        axios.post("http://localhost:8080/api/kanban", {
            task: inputTask,
            description: inputDescription,
            status: Status.OPEN
        }).then(() => {
            setTask("");
            setDescription("")
            props.onTaskChange();

        }).catch((e: AxiosError) => {
            props.errorFunction(e.response?.data)
        })
    }

    return (
        <div className="input-field">
            <form onSubmit={sendTask}>
                <div>
                    <label htmlFor="task">{t("inputField-task")}: </label>
                    <input data-testid={"taskInput"} name="task" required={true} value={inputTask} onChange={ev => setTask(ev.target.value)}/>
                </div>
                <div>
                    <label htmlFor="description">{t("inputField-description")}: </label>
                    <input data-testid={"descInput"} required={true} name="description" value={inputDescription} onChange={ev => setDescription(ev.target.value)}/>
                </div>
                <button data-testid={"submit"} type={"submit"}>{t("inputField-button")}</button>
            </form>
        </div>
    )
}