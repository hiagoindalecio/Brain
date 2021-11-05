import { FindUsersResponse, messageResponse, singOutResponse, UserEditResponse, UserUpdateResponse, userValidationResponse } from '../interfaces/interfaces';
import api from './api';

export async function singIn(email: string, password: string): Promise<userValidationResponse> {
    return new Promise((resolve) => {
        api.get<userValidationResponse>(`/uservalidate/${email}/${password}`).then(response => {
            resolve(response.data as userValidationResponse); 
        });
    });
}

export async function singOut(email: string, password: string): Promise<singOutResponse> {
    return new Promise((resolve) => {
        api.get<singOutResponse>(`/usersingout/${email}/${password}`).then(response => {
            resolve(response.data as singOutResponse); 
        });
    });
}

export async function createUser(email: string, password: string, name: string, image: File): Promise<UserEditResponse> {
    var data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    if (image) {
        data.append('image', image); 
    }
    return new Promise((resolve) => {
        api.post<UserEditResponse>('/users', data).then(response => {
            resolve(response.data as UserEditResponse);
        });
    });
}

export async function updateUser(id: number, name: string | null, password: string | null, image: File | null): Promise<UserUpdateResponse> {
    var data = new FormData();

    if (image) {
        data.append('image', image); 
    }
    if (id) {
        data.append('id', id as unknown as string);
    }
    if (name) {
        data.append('name', name);
    }
    if (password) {
        data.append('password', password);
    }

    return new Promise((resolve) => {
        api.put<UserUpdateResponse>('/users/update', data).then(response => {
            resolve(response.data as UserUpdateResponse);
        });
    });
}

export async function showByName(name: string, id: number): Promise<FindUsersResponse[] | messageResponse> {
    return new Promise((resolve) => {
        api.get<FindUsersResponse[] | messageResponse>(`/users/byname/${name}/${id}`).then(response => {
            if (response.status === 200)
                resolve(response.data as FindUsersResponse[]);
            else
                resolve(response.data as messageResponse);
        });
    });
}

export async function showByCod(cod: string): Promise<FindUsersResponse | messageResponse> {
    return new Promise((resolve) => {
        api.get<FindUsersResponse | messageResponse>(`/users/bycod/${cod}`).then(response => {
            if (response.status === 200)
                resolve(response.data as FindUsersResponse);
            else
                resolve(response.data as messageResponse);
        });
    });
}