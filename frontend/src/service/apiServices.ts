import axios, { AxiosResponse } from "axios";
import { Task } from "./model";

export function fetchAllTasks() {
    return axios.get('/api/kanban')
        .then((response: AxiosResponse<Array<Task>, any> ) => response.data)
}

export function createTask(task: Task) {
    return axios.post('/api/kanban', task)
}

export function deleteTask(taskId: string) {
    return axios.delete(`/api/kanban/` + taskId)
}

export function promoteTask(task: Task){
    return axios.put(`/api/kanban/next`, task)
}

export function demoteTask(task: Task){
    return axios.put(`/api/kanban/prev`, task)
}

export function editTask(task: Task){
    return axios.put(`/api/kanban/`, task)
}

export function getTask(taskId: string){
    return axios.get(`/api/kanban/` + taskId)
}
