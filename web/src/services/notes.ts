import { createNotesResponse, messageResponse, notesResponse } from '../interfaces/interfaces';
import api from './api';

export function getNotes(idUser: number): Promise<notesResponse[]> {
    return new Promise(async (resolve) => {
        api.get<notesResponse[]>(`notes/${idUser}`).then(response => {
            resolve(response.data as notesResponse[]);
        });
    });
}

export function setNotes(userId: number, summaryNote: string, descNote: string): Promise<createNotesResponse> {
    const data = {
        userId,
        summaryNote,
        descNote
    }
    return new Promise((resolve) => {
        api.post<createNotesResponse>(`/notes`, data).then(response => {
            resolve(response.data);
        });
    });
}

export function updateNote(idNote: number, summaryNote: string, descNote: string): Promise<messageResponse> {
    const data = {
        idNote,
        summaryNote,
        descNote
    }

    return new Promise((resolve) => {
        api.post<messageResponse>(`/notes/update`, data).then(response => {
            resolve(response.data);
        });
    });
}

export function drop(idNote: number): Promise<messageResponse> {
    return new Promise((resolve) => {
        api.post<messageResponse>(`/notes/drop`, { idNote }).then(response => {
            resolve(response.data);
        });
    });
}