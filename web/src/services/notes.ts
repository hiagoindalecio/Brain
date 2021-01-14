import api from './api';

interface notesResponse {
    idNote: number,
    idUser: number,
    summary: string,
    desc: string
}

export function getNotes(idUser: number): Promise<notesResponse[]> {
    return new Promise(async (resolve) => {
        api.get<notesResponse[]>(`notes/${idUser}`).then(response => {
            resolve(response.data as notesResponse[]);
        })
    });
}