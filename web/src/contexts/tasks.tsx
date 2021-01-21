import React, {createContext, useState} from 'react';
import * as task from '../services/tasks';

interface Task {
    idTask: number;
    idCheck: number;
    summary: string;
    desc: string;
    status: boolean;
}

interface TasksContextData {
    loading: boolean;
    getTasks: (idCheckpoint: number) => Promise<Array<Task>>;
    setTasks: (idCheck: number, summary: string, description: string) => Promise<createTasksResponse>;
    updateTask: (idTask: number, summary: string, description: string) => Promise<messageResponse>;
}

interface createTasksResponse {
    id: number,
    name: string,
    message: string
}

interface messageResponse {
    message: string;
}

const TaskContext = createContext<TasksContextData>({} as TasksContextData);

export const TasksProvider: React.FC = ({ children }) => {
    const [loading, setLoading] = useState(false);
    //const [tasks, setTasks] = useState<Task[]>([]);
    let responseArray: Array<Task> = [];
    
    async function getTasks(idCheckpoint: number): Promise<Array<Task>> {
        return new Promise(async (resolve) => {
            responseArray = [];
            const taskReply = await task.getTasks(idCheckpoint);
            taskReply.map(async oneTask => {
                responseArray.push(oneTask);
            });
            resolve(responseArray);
        });
    };

    async function setTasks(idCheck: number, summary: string, description: string): Promise<createTasksResponse> {
        return new Promise(async (resolve) => {
            var reply: createTasksResponse = await task.setTasks(idCheck, summary, description);
            resolve(reply);
        });
    };

    async function updateTask(idTask: number, summary: string, description: string): Promise<messageResponse> {
        return new Promise(async (resolve) => {
            var reply: messageResponse = await task.updateTask(idTask, summary, description);
            resolve(reply);
        });
    };

    return (
        <TaskContext.Provider value={{ loading, getTasks, setTasks, updateTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContext;