import React, {useContext} from 'react';

import AuthContext from '../contexts/auth';

import AuthRouts from './auth.routes';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
    const { signed } = useContext(AuthContext);

    return signed ? <AppRoutes /> : <AuthRouts />; //se o usuário estiver logado retorna AppRoutes, se não retorna AuthRouts
};

export default Routes;