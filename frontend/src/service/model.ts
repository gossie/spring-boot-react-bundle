export interface Task{
    id? : string,
    status? : string,
    task : string,
    description : string,
    userId?: string
}

export interface LoginResponse{
    token: string
}