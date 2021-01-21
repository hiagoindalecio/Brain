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
    status: number;
}

interface createCheckpointResponse {
    id: number,
    name: string,
    message: string
}

interface CheckpointsContextData {
    loading: boolean;
    getCheckpoints: (idUser: number) => Promise<Array<CheckpointsData>>;
    setCheckpoint: (id_user: number, summary: string, description: string, limitdate: string) => Promise<createCheckpointResponse>;
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

    async function setCheckpoint(id_user: number, summary: string, description: string, limitdate: string): Promise<createCheckpointResponse> {
        return new Promise(async (resolve) => {
            var reply: createCheckpointResponse = await checkpoint.setCheckpoint(id_user, summary, description, limitdate);
            resolve(reply);
        });
    };

    return (
        <CheckpointsContext.Provider value={{ loading, getCheckpoints, setCheckpoint }}>
            {children}
        </CheckpointsContext.Provider>
    );
};

export default CheckpointsContext;