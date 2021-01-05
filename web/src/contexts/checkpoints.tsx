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
    loading: boolean;
    getCheckpoints: (idUser: number) => Promise<CheckpointsData[]>;
}

const CheckpointsContext = createContext<CheckpointsContextData>({} as CheckpointsContextData);

export const CheckpointsProvider: React.FC = ({ children }) => {
    const [loading, setLoading] = useState(false);
    var tasks: Task[] = [];

    async function getCheckpoints(idUser: number): Promise<CheckpointsData[]> {
        return new Promise(async (resolve) => {
            var responseArray: CheckpointsData[] = [];
            //setLoading(true);
            const checkpointReply = await checkpoint.getCheckpoints(idUser);
            checkpointReply.map(async oneCheckpoint => {
                const tasksReply = await task.getTasks(oneCheckpoint.chekpoint.cod);
                tasksReply.map(oneTask => {
                    tasks.push(oneTask);
                });
                responseArray.push({checkpoint: {...oneCheckpoint.chekpoint, tasks}});
                tasks = [];
            });
            resolve(responseArray);
            //setLoading(false);
        });
    };

    return (
        <CheckpointsContext.Provider value={{ loading, getCheckpoints}}>
            {children}
        </CheckpointsContext.Provider>
    );
};

export default CheckpointsContext;