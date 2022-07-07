import KanbanBoard from "./components/KanbanBoard";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NewItem from "./components/NewItem";
import EditItem from "./components/EditItem";
import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider} from "@mui/material";
import React from "react";
import AuthProvider from "./usermanagement/AuthProvider";
import LoginPage from "./usermanagement/LoginPage";
import RegisterPage from "./usermanagement/RegisterPage";
import NavBar from "./components/NavBar";
import OauthPage from "./usermanagement/OauthPage";


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
                <AuthProvider>
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={<LoginPage/>}/>
                        <Route path="/board" element={<KanbanBoard/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/new" element={<NewItem/>}/>
                        <Route path="/edit/:id" element={<EditItem/>}/>
                        <Route path="/oauth" element={<OauthPage/>}/>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
