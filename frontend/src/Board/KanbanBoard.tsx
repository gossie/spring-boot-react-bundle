import {SetStateAction, useEffect, useState} from "react";
import {Status, TaskItem} from "../model";
import KanbanCard from "./KanbanCard";
import InputField from "../Input/InputField";
import "./KanbanBoard.css"
import axios from "axios";

interface AppProps {
    taskArray: Array<TaskItem>;
    onTaskChange: Function;
}

export default function KanbanBoard(props: AppProps) {

    const taskArray = props.taskArray;

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
        <div>
            <div>
                <div className={"column-wrapper"}>
                    <div className="board-elm">
                        <h2>OPEN</h2>
                        {componentsOpen}
                    </div>
                    <div className="board-elm">
                        <h2>In Progress</h2>
                        {componentsInProgress}
                    </div>
                    <div className="board-elm">
                        <h2>Done</h2>
                        {componentsDone}
                    </div>
                </div>
            </div>
        </div>
    )
}

