import { friendsResponse, messageResponse } from '../interfaces/interfaces';
import api from './api';

export function getFriends(idUser: number): Promise<friendsResponse[]> {
    return new Promise(async (resolve) => {
        api.get<friendsResponse[]>(`/friends/${idUser}`).then(response => {
            resolve(response.data as friendsResponse[]);
        });
    });
}

export function getFriendship(idUser: number, idFriend: number): Promise<friendsResponse> {
    return new Promise(async (resolve) => {
        api.get<friendsResponse>(`/friends/verify/${idUser}/${idFriend}`).then(response => {
            resolve(response.data as friendsResponse);
        });
    });
}

export function getFriendshipRequests(userId: string): Promise<friendsResponse[]> {
    return new Promise(async (resolve) => {
        api.get<friendsResponse[]>(`/friends/requests/${userId}`).then(response => {
            resolve(response.data as friendsResponse[]);
        });
    });
}

export function getFriendshipRequest(userId: string, friendId: string): Promise<friendsResponse> {
    return new Promise(async (resolve) => {
        api.get<friendsResponse>(`/friends/request/${userId}/${friendId}`).then(response => {
            resolve(response.data as friendsResponse);
        });
    });
}

export async function addFriend(userId: string, friendId: string): Promise<messageResponse> {
    var data = {
        userId,
        friendId
    };

    return new Promise((resolve) => {
        api.post<messageResponse>('/friends/add', data).then(response => {
            resolve(response.data as messageResponse);
        });
    });
}

export async function cancelRequest(userId: string, friendId: string): Promise<messageResponse> {
    var data = {
        userId,
        friendId
    };

    return new Promise((resolve) => {
        api.post<messageResponse>('/friends/cancelRequest', data).then(response => {
            resolve(response.data as messageResponse);
        });
    });
}

export async function declineRequest(userId: string, friendId: string): Promise<messageResponse> {
    var data = {
        userId,
        friendId
    };

    return new Promise((resolve) => {
        api.post<messageResponse>('/friends/declineRequest', data).then(response => {
            resolve(response.data as messageResponse);
        });
    });
}

export async function acceptRequest(userId: string, friendId: string): Promise<messageResponse> {
    var data = {
        userId,
        friendId
    };

    return new Promise((resolve) => {
        api.post<messageResponse>('/friends/acceptRequest', data).then(response => {
            resolve(response.data as messageResponse);
        });
    });
}

export async function endFriendship(userId: string, friendId: string): Promise<messageResponse> {
    var data = {
        userId,
        friendId
    };

    return new Promise((resolve) => {
        api.post<messageResponse>('/friends/endFriendship', data).then(response => {
            resolve(response.data as messageResponse);
        });
    });
}