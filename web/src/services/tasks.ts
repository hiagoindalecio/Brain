import { response } from 'express';
import api from './api';

interface tasksResponse {
    idTask: number;
    idCheck: number;
    summary: string;
    desc: string;
    status: boolean;
}

interface createTasksResponse {
    id: number,
    name: string,
    message: string
}

interface messageResponse {
    message: string;
}

interface completeResponse {
    done: number,
    message: string
}

export function getTasks(idCheckpoint: number): Promise<tasksResponse[]> {
    return new Promise(async (resolve) => {
        api.get<tasksResponse[]>(`task/${idCheckpoint}`).then(response => {
            resolve(response.data as tasksResponse[]);
        });
    });
}

export function setTasks(idCheck: number, summary: string, description: string): Promise<createTasksResponse> {
    const data = {
        idCheck,
        summary,
        description
    }
    
    return new Promise((resolve) => {
        api.post<createTasksResponse>(`/tasks`, data).then(response => {
            resolve(response.data);
        });
    });
}

export function updateTask(idTask: number, summary: string, description: string): Promise<messageResponse> {
    const data = {
        idTask,
        summary,
        description
    }

    return new Promise((resolve) => {
        api.post<messageResponse>(`/tasks/update`, data).then(response => {
            resolve(response.data);
        });
    });
}

export function completeTask(idTask: number): Promise<completeResponse> {
    return new Promise((resolve) => {
        api.post<completeResponse>(`/tasks/complete`, {idTask}).then(response => {
            resolve(response.data);
        });
    });
}