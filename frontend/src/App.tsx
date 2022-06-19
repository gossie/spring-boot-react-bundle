import React, {useState, useEffect} from 'react';
import KanbanBoard from "./Board/KanbanBoard";
import InputField from "./Input/InputField";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import EditField from "./Edit/EditField";
import "./App.css"
import {ErrorBoundary} from "react-error-boundary";
import axios from "axios";
import {TaskItem} from "./model";

function App() {

    const [errorMessage, setError] = useState("")
    const [taskArray, setTaskArray] = useState<Array<TaskItem>>([]);

    const fetchTasks = () => {
        axios.get("http://localhost:8080/api/kanban")
            .then(response => response.data)
            .then(data => setTaskArray(data))
            .catch(() => setError("Could not connect to server"))
    }

    useEffect(() => fetchTasks(), [])

    useEffect(() => {
        setTimeout(() => setError(""), 3000)
    }, [errorMessage])

    return (

        <BrowserRouter>
            <div>
                {errorMessage && <div className={"error-message"}>{errorMessage}</div>}
                <h1>Kanban Board</h1>
                <Routes>
                    <Route path="/" element={<>
                        <InputField errorFunction={setError} onTaskChange={fetchTasks}/>
                        <KanbanBoard taskArray={taskArray} onTaskChange={fetchTasks}/>
                    </>}/>
                    <Route path="/:id" element={<EditField onTaskChange={fetchTasks} errorFunction={setError}/>}/>
                </Routes>
            </div>
        </BrowserRouter>


    );
}

export default App;
