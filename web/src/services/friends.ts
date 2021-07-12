import api from './api';

interface friendsResponse {
    cod_friend: number,
    name_friend: string,
    pic_friend: string,
    accepted: number
}

export function getFriends(idUser: number): Promise<friendsResponse[]> {
    return new Promise(async (resolve) => {
        api.get<friendsResponse[]>(`friends/${idUser}`).then(response => {
            resolve(response.data as friendsResponse[]);
        });
    });
}