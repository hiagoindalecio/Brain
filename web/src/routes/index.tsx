import React, {useContext} from 'react';

import AuthContext from '../contexts/auth';
import CheckpointsContext from '../contexts/checkpoints';
import NotesContex from '../contexts/notes';

import AuthRouts from './auth.routes';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
    const { signed, loading: authLoading } = useContext(AuthContext);
    const { loading: checkpointsLoading } = useContext(CheckpointsContext);
    const { loading: notesLoading } = useContext(NotesContex);

    if (authLoading || checkpointsLoading || notesLoading) {
        return (
            <body>
                <h3 style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>Carregando...</h3>
            </body>
        )
    }

    return signed ? <AppRoutes /> : <AuthRouts />; //se o usuário estiver logado retorna AppRoutes, se não retorna AuthRouts
};

export default Routes;