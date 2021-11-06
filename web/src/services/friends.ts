import { friendsResponse } from '../interfaces/interfaces';
import api from './api';

export function getFriends(idUser: number): Promise<friendsResponse[]> {
    return new Promise(async (resolve) => {
        api.get<friendsResponse[]>(`friends/${idUser}`).then(response => {
            resolve(response.data as friendsResponse[]);
        });
    });
}

export function getFriendship(idUser: number, idFriend: number): Promise<friendsResponse> {
    return new Promise(async (resolve) => {
        api.get<friendsResponse>(`friends/${idUser}/${idFriend}`).then(response => {
            resolve(response.data as friendsResponse);
        });
    });
}