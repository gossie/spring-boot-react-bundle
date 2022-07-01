import axios, { AxiosResponse } from "axios";
import {LoginResponse, Task} from "./model";

export function fetchAllTasks() {
    return axios.get('/api/kanban', {
        headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
        .then((response: AxiosResponse<Array<Task>, any> ) => response.data)
}

export function createTask(task: Task) {
    return axios.post('/api/kanban', task, {
        headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
}

export function deleteTask(taskId: string) {
    return axios.delete(`/api/kanban/` + taskId, {
        headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
}

export function promoteTask(task: Task){
    return axios.put(`/api/kanban/next`, task, {
        headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
}

export function demoteTask(task: Task){
    return axios.put(`/api/kanban/prev`, task, {
        headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
}

export function editTask(task: Task){
    return axios.put(`/api/kanban/`, task, {
        headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
}

export function getTask(taskId: string){
    return axios.get(`/api/kanban/` + taskId, {
        headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
}

//----------- Register and Login -----------//

export function registerUser(username: string, password: string){
    return axios.post(`/api/user`,{
        username,
        password
    })
}

export function sendLogin(username: string, password: string){
    return axios.post(`/api/login`,{
        username,
        password
    })
        .then((response:AxiosResponse<LoginResponse>) => response.data)
}