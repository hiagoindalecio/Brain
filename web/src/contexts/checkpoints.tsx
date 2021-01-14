import React, {createContext, useState} from 'react';
import * as checkpoint from '../services/checkpoints';

interface Task {
    idTask: number;
    idCheck: number;
    summary: string;
    desc: string;
    status: boolean;
}

interface CheckpointsData {
    cod: number;
    codUser: number;
    summary: string;
    limitdate: string;
    description: string;
}

interface CheckpointsContextData {
    loading: boolean;
    getCheckpoints: (idUser: number) => Promise<Array<CheckpointsData>>;
}

const CheckpointsContext = createContext<CheckpointsContextData>({} as CheckpointsContextData);

export const CheckpointsProvider: React.FC = ({ children }) => {
    const [loading, setLoading] = useState(false);
    let responseArray: Array<CheckpointsData> = [];

    async function getCheckpoints(idUser: number): Promise<Array<CheckpointsData>> {
        return new Promise(async (resolve) => {
            responseArray = [];
            const checkpointReply = await checkpoint.getCheckpoints(idUser);
            checkpointReply.map(async oneCheckpoint => {
                responseArray.push(oneCheckpoint);
            });
            resolve(responseArray);
        });
    };

    return (
        <CheckpointsContext.Provider value={{ loading, getCheckpoints}}>
            {children}
        </CheckpointsContext.Provider>
    );
};

export default CheckpointsContext;