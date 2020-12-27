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
    checkpointsResponse: CheckpointsData[];
    loading: boolean;
    getCheckpoints: (idUser: number) => Promise<boolean>;
    getThreeNextCheckpoints: (idUser: number) => Promise<boolean>;
}

const CheckpointsContext = createContext<CheckpointsContextData>({} as CheckpointsContextData);

export const CheckpointsProvider: React.FC = ({ children }) => {
    const [loading, setLoading] = useState(false);
    var tasks: Task[] = [];
    const [checkpointsResponse, setCheckpointsResponse] = useState<CheckpointsData[]>([]);

    function getCheckpoints(idUser: number): Promise<boolean> {
        return new Promise(async (resolve) => {
            setCheckpointsResponse([]);
            var responseArray: CheckpointsData[] = [];
            setLoading(true);
            // checkpoint.getThreeNextCheckpoints(idUser).then(checkpointResponse => {
            //     checkpointResponse.map(oneCheckpoint => {
            //         task.getTasks(oneCheckpoint.chekpoint.cod).then(taskResponse => {
            //             setTasks(taskResponse);
            //         });
            //         console.log(tasks);
            //         responseArray.push({checkpoint: {...oneCheckpoint.chekpoint, tasks}});
            //     });
            // });
            //console.log(responseArray);
            const checkpointReply = await checkpoint.getCheckpoints(idUser);
            checkpointReply.map(async oneCheckpoint => {
                const tasksReply = await task.getTasks(oneCheckpoint.chekpoint.cod);
                tasksReply.map(oneTask => {
                    tasks.push(oneTask);
                });
                responseArray.push({checkpoint: {...oneCheckpoint.chekpoint, tasks}});
                tasks = [];
            });
            try {
                setCheckpointsResponse(responseArray);
                responseArray = [];
                setLoading(false);
                resolve(true);
                
            } catch {
                setLoading(false);
                resolve(false);
            }
        });
    };

    async function getThreeNextCheckpoints(idUser: number): Promise<boolean> {
        return new Promise(async (resolve) => {
            setCheckpointsResponse([]);
            var responseArray: CheckpointsData[] = [];
            setLoading(true);
            const checkpointReply = await checkpoint.getThreeNextCheckpoints(idUser);
            checkpointReply.map(async oneCheckpoint => {
                const tasksReply = await task.getTasks(oneCheckpoint.chekpoint.cod);
                tasksReply.map(oneTask => {
                    tasks.push(oneTask);
                });
                responseArray.push({checkpoint: {...oneCheckpoint.chekpoint, tasks}});
                tasks = [];
            });
            try {
                setCheckpointsResponse(responseArray);
                responseArray = [];
                setLoading(false);
                resolve(true);
                
            } catch {
                setLoading(false);
                resolve(false);
            }
        });
    };

    return (
        <CheckpointsContext.Provider value={{checkpointsResponse, loading, getCheckpoints, getThreeNextCheckpoints}}>
            {children}
        </CheckpointsContext.Provider>
    );
};

export default CheckpointsContext;