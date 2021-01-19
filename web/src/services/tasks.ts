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

export function getTasks(idCheckpoint: number): Promise<tasksResponse[]> {
    return new Promise(async (resolve) => {
        api.get<tasksResponse[]>(`task/${idCheckpoint}`).then(response => {
            resolve(response.data as tasksResponse[]);
        });
    });
}

export function setTasks(id_user: number, summary: string, description: string): Promise<createTasksResponse> {
    const data = {
        id_user: id_user,
        summary: summary,
        description: description
    }
    
    return new Promise((resolve) => {
        api.post<createTasksResponse>(`/tasks`, data).then(response => {
            resolve(response.data);
        });
    });
}