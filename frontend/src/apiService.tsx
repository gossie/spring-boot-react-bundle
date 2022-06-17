import axios from "axios";
import {Todo} from "./model";

axios.defaults.baseURL = "http://localhost:8080/api/kanban"

export function moveTaskToNext(todo: Todo){
    return axios.put("/next", todo)
        .then(response => response.data);
}

export function moveTaskToPrev(todo: Todo){
    return axios.put("/prev", todo)
        .then(response => response.data);
}

export function createNewTask(todo: Todo){
    return axios.post("", todo)
        .then(response => response.data);
}

export function editTask(todo: Todo){
    return axios.put("", todo)
        .then(response => response.data);
}

export function getTaskById(id: string) {
    return axios.get("/" + id)
        .then(response => response.data);
}

export function deleteTask(id: string) {
    return axios.delete("/" + id)
        .then(response => response.data);
}

export function getAllTasks(){
    return axios.get("")
        .then(response => response.data);

}