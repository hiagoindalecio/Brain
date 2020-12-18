import React, {createContext, useState} from 'react';
import * as auth from '../services/auth';

interface AuthContextData {
    signed: boolean;
    user: object | null;
    singIn(): Promise<void>;
    singOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<object | null>(null);

    async function singIn() {
        const response = await auth.singIn();
        setUser(response.user);
    }

    function singOut() {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{signed: !!user, user, singIn, singOut}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;