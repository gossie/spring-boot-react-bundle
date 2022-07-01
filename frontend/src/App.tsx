import "./App.css"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import EditPage from "./pages/edit/EditPage";
import WelcomePage from "./pages/welcome/WelcomePage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";

export default function App(){

    return(
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<WelcomePage/>}/>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/register"} element={<RegisterPage/>}/>
                <Route path={"/main"} element={<MainPage/>} />
                <Route path={"/:id"} element={<EditPage/>} />
            </Routes>
        </BrowserRouter>
    )
}