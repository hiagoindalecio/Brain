import api from './api';

interface checkpointResponse {
    cod: number;
    codUser: number;
    summary: string;
    limitdate: string;
    description: string;
    status: number;
}

interface createCheckpointResponse {
    id: number,
    name: string,
    message: string
}

export function getCheckpoints(idUser: number): Promise<checkpointResponse[]> {
    return new Promise((resolve) => {
        api.get<checkpointResponse[]>(`/checkpoint/${idUser}`).then(response => {
            resolve(response.data);
        });
    });
}

export function setCheckpoint(id_user: number, summary: string, description: string, limitdate: string): Promise<createCheckpointResponse> {
    const data = {
        id_user: id_user,
        summary: summary,
        description: description,
        limitdate: limitdate
    }
    
    return new Promise((resolve) => {
        api.post<createCheckpointResponse>(`/checkpoint`, data).then(response => {
            resolve(response.data);
        });
    });
}