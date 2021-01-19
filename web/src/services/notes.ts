import api from './api';

interface notesResponse {
    idNote: number,
    idUser: number,
    summary: string,
    desc: string
}

interface createNotesResponse {
    id: number,
    name: string,
    message: string
}

export function getNotes(idUser: number): Promise<notesResponse[]> {
    return new Promise(async (resolve) => {
        api.get<notesResponse[]>(`notes/${idUser}`).then(response => {
            resolve(response.data as notesResponse[]);
        })
    });
}

export function setNotes(id_user: number, summary: string, description: string): Promise<createNotesResponse> {
    const data = {
        id_user: id_user,
        summary: summary,
        description: description
    }
    
    return new Promise((resolve) => {
        api.post<createNotesResponse>(`/notes`, data).then(response => {
            resolve(response.data);
        });
    });
}