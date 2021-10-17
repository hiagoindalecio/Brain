import React, {createContext, useEffect, useState } from 'react';
import { AuthContextData, User } from '../interfaces/interfaces';
import * as auth from '../services/auth';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentScreen, setCurrentScreen] = useState<string>('Home');

    useEffect(() => {
        async function loadStorageData() {
            setLoading(true);
            const storagedUser = localStorage.getItem('@RNAuth:user');
            if (storagedUser) {
                setUser(JSON.parse(storagedUser));
            }
            const current = localStorage.getItem('@RNAuth:currentScreen');
            if (current) {
                setCurrentScreen(current);
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
                setLoading(false);
                resolve('Sucesso!');
            } else {
                setLoading(false);
                resolve('E-mail ou senha digitados incorretamente.');
            }
        });
    }

    async function createUser(email: string, password: string, name: string, image: File): Promise<string> {
        return new Promise(async (resolve) => {
            setLoading(true);
            const response = await auth.createUser(email, password, name, image);
            resolve(response.message);
            setLoading(false);
        });
    }

    async function updateUser(id: number, name: string | null, password: string | null, image: File | null): Promise<string> {
        setLoading(true);
        const response = await auth.updateUser(id, name, password, image);
        response.userReply.password = password as string;
        if(response.message === 'The user has been modified') {
            setUser({...response.userReply, email: user? user.email : '', points: user ? user.points : 0});
            localStorage.setItem('@RNAuth:user', JSON.stringify(user));
        }
        return new Promise(async (resolve) => {
            resolve(response.message);
            setLoading(false);
        });
    }

    function singOut(email: string, password: string): Promise<string> {
        return new Promise(async (resolve) => {
            setLoading(true);
            const response = await auth.singOut(email, password);
            
            if(response.message == 'Usuário deslogado.' && response !== undefined) {
                localStorage.clear();
                setUser(null);
                setCurrentScreen('Home');
                setLoading(false);
                resolve('Sucesso!');
            } else {
                setLoading(false);
                resolve('E-mail ou senha digitados incorretamente.');
            }
        });
    }

    function setPoints(pointsUser: number) {
        var userAll = {
            id: user ? user.id as number : -1,
            name: user ? user.name as string : '',
            email: user ? user.email as string : '',
            points: pointsUser,
            password: user ? user.password as string : '',
            image_url: user ? user.image_url as string : ''
        }
        localStorage.setItem('@RNAuth:user', JSON.stringify(userAll));
        console.log(userAll.points);
        setUser(userAll);
    }

    function selectScreen(eleme: string) {
        setLoading(true);
        setCurrentScreen(eleme);
        localStorage.setItem('@RNAuth:currentScreen', eleme);
        setLoading(false);
    }

    return (
        <AuthContext.Provider value={{signed: !!user, user, loading, currentScreen, singIn, createUser, updateUser, singOut, setPoints, selectScreen}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;