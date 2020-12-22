import { response } from 'express';
import React, {createContext, useContext, useEffect, useState} from 'react';
import * as checkpoint from '../services/checkpoints';
import * as task from '../services/tasks';

interface Task {
    task: {
        idTask: number,
        idCheck: number,
        summary: String,
        desc: String,
        status: boolean
    }
}

interface Checkpoints {
    chekpoint: {
        cod: number,
        codUser: number,
        summary: string,
        limitdate: string,
        description: string
    }
}

interface CheckpointsData {
    chekpoint: {
        cod: number,
        codUser: number,
        summary: string,
        limitdate: string,
        description: string,
        tasks: Task[];
    }
}

interface CheckpointsContextData {
    checkpointsResponse: CheckpointsData[] | any,
    loading: boolean,
    getCheckpoints(idUser: number): void,
    getThreeNextCheckpoints(idUser: number): void
}

const CheckpointsContext = createContext<CheckpointsContextData>({} as CheckpointsContextData);

export const CheckpointsProvider: React.FC = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState<Task[]>();
    const [checkpointsResponse, setCheckpointsResponse] = useState<CheckpointsData[] | any>();
    const [checkpoints, setCheckpoints] = useState<Checkpoints[]>();

    async function getCheckpoints(idUser: number) {
        setLoading(true);
        const checkpointResponse = await checkpoint.getCheckpoints(idUser);
        if(checkpointResponse[0].chekpoint.summary !== 'Vazio') {
            setCheckpoints(checkpointResponse);
            checkpointResponse.map(checkpointResponse => {
                task.getTasks(checkpointResponse.chekpoint.cod).then(taskResponse => {
                    if(taskResponse[0].task.summary !== 'Vazio') {
                        setTasks(taskResponse);
                    }
                    setCheckpointsResponse({...checkpointsResponse, checkpoints, tasks});
                });
            })
        }
        setLoading(false);
    }

    async function getThreeNextCheckpoints(idUser: number) {
        setLoading(true);
        const checkpointResponse = await checkpoint.getCheckpoints(idUser);
        if(checkpointResponse[0].chekpoint.summary !== 'Vazio') {
            setCheckpoints(checkpointResponse);
            checkpointResponse.map(checkpointResponse => {
                task.getTasks(checkpointResponse.chekpoint.cod).then(taskResponse => {
                    if(taskResponse[0].task.summary !== 'Vazio') {
                        setTasks(taskResponse);
                    }
                    setCheckpointsResponse({...checkpointsResponse, checkpoints, tasks});
                });
            })
        }
        setLoading(false);
    }

    return (
        <CheckpointsContext.Provider value={{checkpointsResponse, loading, getCheckpoints, getThreeNextCheckpoints}}>
            {children}
        </CheckpointsContext.Provider>
    )
}

export default CheckpointsContext;