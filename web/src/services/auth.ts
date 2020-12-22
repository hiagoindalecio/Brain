import api from './api';

interface userValidationResponse {
    user: {
        id: number;
        name: string;
        points: number;
    }
}

export function singIn(email: string, password: string): Promise<userValidationResponse> {
    return new Promise((resolve) => {
        api.get<userValidationResponse>(`uservalidate/${email}/${password}`).then(response => {
            resolve(response.data as userValidationResponse); 
        });
    });
}