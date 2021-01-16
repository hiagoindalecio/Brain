import api from './api';

interface userValidationResponse {
    user: {
        id: number;
        name: string;
        points: number;
    }
}

interface UserCreationResponse {
    message: string;
}

export async function singIn(email: string, password: string): Promise<userValidationResponse> {
    return new Promise((resolve) => {
        api.get<userValidationResponse>(`/uservalidate/${email}/${password}`).then(response => {
            resolve(response.data as userValidationResponse); 
        });
    });
}

export async function createUser(email: string, password: string, name: string): Promise<UserCreationResponse> {
    const data = {
        name: name,
        email: email,
        password: password
    }
    return new Promise((resolve) => {
        api.post<UserCreationResponse>('/users', data).then(response => {
            resolve(response.data as UserCreationResponse);
        });
    });
}