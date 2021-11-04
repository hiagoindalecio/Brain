import { completeResponse, createTasksResponse, messageResponse, tasksResponse } from '../interfaces/interfaces';
import api from './api';

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