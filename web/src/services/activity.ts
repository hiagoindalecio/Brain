import { activityResponse } from '../interfaces/interfaces';
import api from './api';

export function getFriendsActiity(idUser: number): Promise<activityResponse[]> {
    return new Promise((resolve) => {
        api.get<activityResponse[]>(`/activity/${idUser}`).then(response => {
            resolve(response.data);
        });
    });
}