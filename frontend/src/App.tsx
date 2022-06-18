import KanbanBoard from "./components/KanbanBoard";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NewItem from "./components/NewItem";
import EditItem from "./components/EditItem";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<KanbanBoard/>}/>
                <Route path="/new" element={<NewItem/>}/>
                <Route path="/edit/:id" element={<EditItem/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
