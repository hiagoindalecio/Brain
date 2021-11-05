import { activityResponse } from '../interfaces/interfaces';
import api from './api';

export function getFriendsActivity(idUser: number): Promise<activityResponse[]> {
    return new Promise((resolve) => {
        api.get<activityResponse[]>(`/activity/${idUser}`).then(response => {
            resolve(response.data);
        });
    });
}

export function getByUser(idUser: string): Promise<activityResponse[]> {
    return new Promise((resolve) => {
        api.get<activityResponse[]>(`/activity/getByUser/${idUser}`).then(response => {
            resolve(response.data);
        });
    });
}