import "./App.css"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import EditPage from "./pages/EditPage";

export default function App(){

    return(
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<MainPage/>} />
                <Route path={"/:id"} element={<EditPage/>} />
            </Routes>
        </BrowserRouter>
    )
}