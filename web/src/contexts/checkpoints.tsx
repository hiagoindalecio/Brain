import React, {createContext, useState} from 'react';
import { CheckpointsContextData, CheckpointsData, completeResponse, createCheckpointResponse, messageResponse } from '../interfaces/interfaces';
import * as checkpoint from '../services/checkpoints';

const CheckpointsContext = createContext<CheckpointsContextData>({} as CheckpointsContextData);

export const CheckpointsProvider: React.FC = ({ children }) => {
    const [loading] = useState(false);
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

    async function updateCheckpoint(idCheck: number, summary: string, description: string, limitdate: string): Promise<messageResponse> {
        return new Promise(async (resolve) => {
            var reply: messageResponse = await checkpoint.updateCheckpoint(idCheck, summary, description, limitdate);
            resolve(reply);
        });
    };

    async function completeCheckpoint(idCheck: number): Promise<completeResponse> {
        return new Promise(async (resolve) => {
            var reply: completeResponse = await checkpoint.completeCheckpoint(idCheck);
            resolve(reply);
        });
    };

    async function deleteCheckpoint(idCheck: number): Promise<messageResponse> {
        return new Promise(async (resolve) => {
            var reply: messageResponse = await checkpoint.deleteCheckpoint(idCheck);
            resolve(reply);
        });
    };

    return (
        <CheckpointsContext.Provider value={{ loading, getCheckpoints, setCheckpoint, updateCheckpoint, completeCheckpoint, deleteCheckpoint }}>
            {children}
        </CheckpointsContext.Provider>
    );
};

export default CheckpointsContext;