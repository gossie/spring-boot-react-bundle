import axios from "axios";
import {TaskItem} from "../model";

export function getAllData() {
   return axios.get("http://localhost:8080/api/kanban")
        .then(response => response.data)
}

export function getTaskById(id: string) {
   return axios.get(`http://localhost:8080/api/kanban/${id}`)
}

export function moveTaskToNextState(item: TaskItem) {
   return axios.put("http://localhost:8080/api/kanban/next", item)
}

export function moveTaskToPrevState(item: TaskItem) {
   return axios.put("http://localhost:8080/api/kanban/prev", item)
}

export function deleteTaskFromBackend(id: string) {
   return axios.delete(`http://localhost:8080/api/kanban/${id}`)
}

export function addTask(item: TaskItem) {
   return axios.post("http://localhost:8080/api/kanban", item)
}

export function editTask(item: TaskItem) {
   return axios.put("http://localhost:8080/api/kanban", item)
}