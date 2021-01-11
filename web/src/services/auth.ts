import api from './api';

interface userValidationResponse {
    user: {
        id: number;
        name: string;
        points: number;
    }
}

export async function singIn(email: string, password: string): Promise<userValidationResponse> {
    return new Promise((resolve) => {
        api.get<userValidationResponse>(`/uservalidate/${email}/${password}`).then(response => {
            resolve(response.data as userValidationResponse); 
        });
    });
}

export async function createUser(email: string, password: string, name: string): Promise<String> {
    // const data = new FormData();
    // data.append('name', name);
    // data.append('email', email);
    // data.append('password', password);
    const data = {
        name: name,
        email: email,
        password: password
    }
    console.log(data);
    return new Promise((resolve) => {
        api.post<String>('/users', data).then(response => {
            resolve(response.data);
        });
    });
}