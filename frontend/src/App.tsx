import KanbanBoard from "./components/KanbanBoard";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NewItem from "./components/NewItem";
import EditItem from "./components/EditItem";
import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider} from "@mui/material";
import React from "react";


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<KanbanBoard/>}/>
                    <Route path="/new" element={<NewItem/>}/>
                    <Route path="/edit/:id" element={<EditItem/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
