import React, {createContext, useEffect, useState} from 'react';
import * as auth from '../services/auth';
import api from '../services/api';

interface User {
    id: number | undefined;
    name: string | undefined;
    points: number | undefined;
}

interface AuthContextData {
    signed: boolean;
    user: User | null;
    loading: boolean;
    singIn(email: string, password: string): Promise<boolean>;
    singOut(): void;
}

interface Task {
    description: string;
    date: string;
}

interface Checkpoint {
    title: string;
    date: string;
    tasks: Task[];
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            setLoading(true);
            const storagedUser = await localStorage.getItem('@RNAuth:user');
            await new Promise((resolve) => setTimeout(resolve, 1000)); //remover esse timeout
            if (storagedUser) {
                setUser(JSON.parse(storagedUser));
            }
            setLoading(false);
        }
        loadStorageData();
    }, [])

    async function singIn(email: string, password: string) {
        setLoading(true);
        const response = await auth.singIn(email, password);
        if(response.user.name !== 'Vazio') {
            setUser(response.user);
            localStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
        }
        setLoading(false);
        return (user ? true : false);
    }

    function singOut() {
        localStorage.clear();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{signed: !!user, user, loading, singIn, singOut}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;