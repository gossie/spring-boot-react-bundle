import {SetStateAction, useEffect, useState} from "react";
import {Status, TaskItem} from "../model";
import KanbanCard from "./KanbanCard";
import InputField from "../Input/InputField";
import "./KanbanBoard.css"
import axios from "axios";
import {t} from "i18next";
import {useTranslation} from "react-i18next";

interface AppProps {
    taskArray: Array<TaskItem>;
    onTaskChange: Function;
}

export default function KanbanBoard(props: AppProps) {

    const taskArray = props.taskArray;
    const {t} = useTranslation();

    const componentsOpen = taskArray.filter(task => task.status === Status.OPEN)
        .map(task => <KanbanCard key={task.id} item={task}
                                 onTaskChange={props.onTaskChange}
        />);

    const componentsInProgress = taskArray.filter(task => task.status === Status.IN_PROGRESS)
        .map(task => <KanbanCard key={task.id} item={task}
                                 onTaskChange={props.onTaskChange}
        />);

    const componentsDone = taskArray.filter(task => task.status === Status.DONE)
        .map(task => <KanbanCard key={task.id} item={task}
                                 onTaskChange={props.onTaskChange}
        />);

    return (

        <div className={"column-wrapper"}>
            <div className="board-elm">
                <h1>{t("open")}</h1>
                {componentsOpen}
            </div>
            <div className="board-elm">
                <h1>{t("in-progress")}</h1>
                {componentsInProgress}
            </div>
            <div className="board-elm">
                <h1>{t("done")}</h1>
                {componentsDone}
            </div>
        </div>

    )
}

