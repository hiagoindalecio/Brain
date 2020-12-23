import React, {createContext, useEffect, useState} from 'react';
import * as checkpoint from '../services/checkpoints';
import * as task from '../services/tasks';

interface Task {
    task: {
        idTask: number;
        idCheck: number;
        summary: string;
        desc: string;
        status: boolean;
    }
}

interface CheckpointsData {
    checkpoint: {
        cod: number;
        codUser: number;
        summary: string;
        limitdate: string;
        description: string;
        tasks: Task[];
    }
}

interface CheckpointsContextData {
    checkpointsResponse: CheckpointsData[] | null;
    loading: boolean;
    getCheckpoints: (idUser: number) => void;
    getThreeNextCheckpoints:(idUser: number) => void;
}

const CheckpointsContext = createContext<CheckpointsContextData>({} as CheckpointsContextData);

export const CheckpointsProvider: React.FC = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [checkpointsResponse, setCheckpointsResponse] = useState<CheckpointsData[]>([]);

    async function getCheckpoints(idUser: number) {
        var responseArray: CheckpointsData[] = [];
        setLoading(true);
        const checkpointResponse = await checkpoint.getCheckpoints(idUser);
        if(checkpointResponse[0].chekpoint.summary !== 'Vazio') {
            checkpointResponse.map(oneCheckpoint => {
                task.getTasks(oneCheckpoint.chekpoint.cod).then(taskResponse => {
                    if(taskResponse[0].task.summary !== 'Vazio') {
                        setTasks(taskResponse);
                    }
                });
                responseArray.push({checkpoint: {...oneCheckpoint.chekpoint, tasks}});
            })
        }
        setCheckpointsResponse(responseArray);
        setLoading(false);
    };

    async function getThreeNextCheckpoints(idUser: number) {
        var responseArray: CheckpointsData[] = [];
        setLoading(true);
        const checkpointResponse = await checkpoint.getThreeNextCheckpoints(idUser);
        if(checkpointResponse[0].chekpoint.summary !== 'Vazio') {
            checkpointResponse.map(oneCheckpoint => {
                task.getTasks(oneCheckpoint.chekpoint.cod).then(taskResponse => {
                    if(taskResponse[0].task.summary !== 'Vazio') {
                        setTasks(taskResponse);
                    }
                });
                responseArray.push({checkpoint: {...oneCheckpoint.chekpoint, tasks}});
            })
        }
        setCheckpointsResponse(responseArray);
        setLoading(false);
        alert('passou')
    };

    return (
        <CheckpointsContext.Provider value={{checkpointsResponse, loading, getCheckpoints, getThreeNextCheckpoints}}>
            {children}
        </CheckpointsContext.Provider>
    );
};

export default CheckpointsContext;