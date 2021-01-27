import React, {createContext, useEffect, useState, SetStateAction, Dispatch } from 'react';
import * as auth from '../services/auth';

interface User {
    id: number | undefined;
    name: string | undefined;
    points: number | undefined;
}

interface AuthContextData {
    signed: boolean;
    user: User | null;
    loading: boolean;
    singIn(email: string, password: string): Promise<string>;
    createUser(email: string, password: string, name: string): Promise<String>;
    singOut(): void;
    setPoints(pointsUser: number): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            setLoading(true);
            const storagedUser = await localStorage.getItem('@RNAuth:user');
            if (storagedUser) {
                setUser(JSON.parse(storagedUser));
            }
            setLoading(false);
        }
        loadStorageData();
    }, [])

    async function singIn(email: string, password: string): Promise<string> {
        return new Promise(async (resolve) => {
            setLoading(true);
            const response = await auth.singIn(email, password);
            if(response.user.name !== 'Vazio' && response !== undefined) {
                setUser(response.user);
                localStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
                resolve('Sucesso!');
            } else {
                resolve('E-mail ou senha digitados incorretamente.');
            }
            setLoading(false);
        });
    }

    async function createUser(email: string, password: string, name: string): Promise<String> {
        return new Promise(async (resolve) => {
            setLoading(true);
            const response = await auth.createUser(email, password, name);
            resolve(response.message);
            setLoading(false);
        });
    }

    function singOut() {
        localStorage.clear();
        setUser(null);
    }

    function setPoints(pointsUser: number) {
        var userAll = {
            id: user ? user.id as number : -1,
            name: user ? user.name as string : '',
            points: pointsUser
        }
        localStorage.setItem('@RNAuth:user', JSON.stringify(userAll));
        console.log(userAll.points);
        setUser(userAll);
    }

    return (
        <AuthContext.Provider value={{signed: !!user, user, loading, singIn, createUser, singOut, setPoints}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;