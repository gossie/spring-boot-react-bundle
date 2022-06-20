import {FormEvent, useEffect, useState} from "react";
import {Status, TaskItem} from "../model";
import "./InputField.css"
import axios, {AxiosError} from "axios";
import {useTranslation} from "react-i18next";
import {addTask} from "../API_services/services";

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
        const item: TaskItem = {
            task: inputTask,
            description: inputDescription,
            status: Status.OPEN
        }
         addTask(item)
            .then(() => {
            setTask("");
            setDescription("")
            props.onTaskChange();

        }).catch((e: AxiosError) => {
            props.errorFunction(e.response?.data)
        })
    }

    return (
        <div className={"inputField-wrapper"}>
            <div className="input-field">
                <form onSubmit={sendTask}>
                    <div className={"input-wrapper"}>
                        <div className={"inputField-label-box"}>
                            <label className={"label"} htmlFor="task">{t("inputField-task")}: </label>
                            <label className={"label"} htmlFor="description">{t("inputField-description")}: </label>
                        </div>
                        <div className={"inputField-input-box"}>
                            <input className={"input"} data-testid={"taskInput"} name="task" required={true} value={inputTask} onChange={ev => setTask(ev.target.value)}/>
                            <input className={"input"} data-testid={"descInput"} required={true} name="description" value={inputDescription} onChange={ev => setDescription(ev.target.value)}/>
                        </div>
                    </div>
                    <div className={"button-div"}>
                        <button data-testid={"submit"} type={"submit"}>{t("inputField-button")}</button>
                    </div>
                </form>
            </div>
        </div>

    )
}