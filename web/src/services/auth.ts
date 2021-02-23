import api from './api';

interface userValidationResponse {
    user: {
        id: number;
        name: string;
        points: number;
        image_url: string;
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

export async function createUser(email: string, password: string, name: string, image: File): Promise<UserCreationResponse> {
    var data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    if (image) {
        data.append('image', image); 
    }
    return new Promise((resolve) => {
        api.post<UserCreationResponse>('/users', data).then(response => {
            resolve(response.data as UserCreationResponse);
        });
    });
}