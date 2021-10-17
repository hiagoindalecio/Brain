import { checkpointResponse, completeResponse, createCheckpointResponse, messageResponse } from '../interfaces/interfaces';
import api from './api';

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

export function deleteCheckpoint(idCheck: number): Promise<messageResponse> {
    return new Promise((resolve) => {
        api.post<messageResponse>('/checkpoint/delete', { idCheck }).then(response => {
            resolve(response.data);
        });
    });
}