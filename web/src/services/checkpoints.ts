import api from './api';

interface checkpointResponse {
    chekpoint: {
        cod: number,
        codUser: number,
        summary: string,
        limitdate: string,
        description: string
    }
}

export function getCheckpoints(idUser: number): Promise<checkpointResponse[]> {
    return new Promise((resolve) => {
        api.get<checkpointResponse[]>(`checkpoint/${idUser}`).then(response => {
            resolve(response.data as checkpointResponse[]);
        });
    });
}

export function getThreeNextCheckpoints(idUser: number): Promise<checkpointResponse[]> {
    return new Promise((resolve) => {
        api.get<checkpointResponse[]>(`checkpoint/date/${idUser}`).then(response => {
            resolve(response.data as checkpointResponse[]);
        });
    });
}