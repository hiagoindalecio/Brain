import api from './api';

interface userValidationResponse {
    user: {
        id: number;
        name: string;
        points: number;
    }
}

export function singIn(email: string, password: string): Promise<userValidationResponse> {
    //const [validationResponse, setValidationResponse] = useState<userValidationResponse>();
    //alert(`Email: ${email}\nSenha: ${password}`);
    /*return new Promise((resolve) => {
        resolve({
            user: {
                id: 1,
                name: 'Hiago Indalécio',
                points: 10
            },
        });
    });*/
    return new Promise((resolve) => {
        api.get<userValidationResponse>(`uservalidate/${email}/${password}`).then(response => {
            resolve(response.data as userValidationResponse); 
        });
    });
}