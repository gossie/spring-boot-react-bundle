import axios, {AxiosResponse} from "axios";
import {LoginResponse, MyUser, RegisterUser, Todo} from "./model";

export function moveTaskToNext(todo: Todo){
    return axios.put("/api/kanban/next", todo, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then(response => response.data);
}

export function moveTaskToPrev(todo: Todo){
    return axios.put("/api/kanban/prev", todo, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then(response => response.data);
}

export function createNewTask(todo: Todo){
    return axios.post("/api/kanban", todo, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then(response => response.data);
}

export function editTask(todo: Todo){
    return axios.put("/api/kanban", todo, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then(response => response.data);
}

export function getTaskById(id: string) {
    return axios.get("/api/kanban/" + id, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then(response => response.data);
}

export function deleteTask(id: string) {
    return axios.delete("/api/kanban/" + id, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then(response => response.data);
}

export function getAllTasks(){
    return axios.get("/api/kanban", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then((response: AxiosResponse<Todo[]>) => response.data);

}


export function sendRegister(user: RegisterUser) {
    return axios.post("/api/user", user)
        .then(r => r.data);
}

export function sendLogin(user: MyUser) {
    return axios.post("/api/login", user)
        .then((response: AxiosResponse<LoginResponse>) => response.data)
}
