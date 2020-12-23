import React, {createContext, useEffect, useState} from 'react';
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
    singIn(email: string, password: string): Promise<boolean>;
    singOut(): void;
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

    async function singIn(email: string, password: string): Promise<boolean> {
        setLoading(true);
        const response = await auth.singIn(email, password);
        if(response.user.name !== 'Vazio' && response !== undefined) {
            setUser(response.user);
            localStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
        }
        setLoading(false);
        return (!!user);
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