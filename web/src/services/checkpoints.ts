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

interface messageResponse {
    message: string
}

interface completeResponse {
    done: number,
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
        id_user,
        summary,
        description,
        limitdate
    }
    
    return new Promise((resolve) => {
        api.post<createCheckpointResponse>(`/checkpoint`, data).then(response => {
            resolve(response.data);
        });
    });
}

export function updateCheckpoint(idCheck: number, summary: string, description: string, limitdate: string): Promise<messageResponse> {
    const data = {
        idCheck,
        summary,
        description,
        limitdate
    }

    return new Promise((resolve) => {
        api.post<messageResponse>(`/checkpoint/update`, data).then(response => {
            resolve(response.data);
        });
    });
}

export function completeCheckpoint(idCheck: number): Promise<completeResponse> {
    const data = {
        idCheck
    }

    return new Promise((resolve) => {
        api.post<completeResponse>(`/checkpoint/complete`, data).then(response => {
            resolve(response.data);
        });
    });
}