import React, { useState, useEffect } from 'react';
import KanbanBoard from "./Board/KanbanBoard";
import InputField from "./Input/InputField";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import EditField from "./Edit/EditField";
import "./App.css"

function App() {

    return (
        <BrowserRouter>
            <div>
                <h1>Kanban Board</h1>
                <Routes>
                    <Route path="/" element={<KanbanBoard/>}/>
                    <Route path="/:id" element={<EditField/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
