import react from 'react';
import api from './api';

interface userValidationResponse {
    user: {
        id: number;
        name: string;
        points: number;
    }
}

export function singIn(): Promise<userValidationResponse> {
    return new Promise((resolve) => {
        resolve({
            user: {
                id: 1,
                name: 'Hiago Indalécio',
                points: 10
            },
        });
    });
}