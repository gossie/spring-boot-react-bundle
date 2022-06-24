import axios from "axios";
import {TaskItem} from "../model";

export function getAllData() {
   return axios.get("/api/kanban")
        .then(response => response.data)
}

export function getTaskById(id: string) {
   return axios.get(`/api/kanban/${id}`)
}

export function moveTaskToNextState(item: TaskItem) {
   return axios.put("/api/kanban/next", item)
}

export function moveTaskToPrevState(item: TaskItem) {
   return axios.put("/api/kanban/prev", item)
}

export function deleteTaskFromBackend(id: string) {
   return axios.delete(`/api/kanban/${id}`)
}

export function addTask(item: TaskItem) {
   return axios.post("/api/kanban", item)
}

export function editTask(item: TaskItem) {
   return axios.put("/api/kanban", item)
}