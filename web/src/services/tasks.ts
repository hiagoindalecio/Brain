import api from './api';

interface tasksResponse {
    task: {
        idTask: number,
        idCheck: number,
        summary: String,
        desc: String,
        status: boolean
    }
}

export function getTasks(idCheckpoint: number): Promise<tasksResponse[]> {
    return new Promise((resolve) => {
        api.get<tasksResponse[]>(`task/${idCheckpoint}`).then(response => {
            resolve(response.data as tasksResponse[]);
        });
    });
}