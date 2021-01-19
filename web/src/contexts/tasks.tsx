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
}

interface createTasksResponse {
    id: number,
    name: string,
    message: string
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

    async function setTasks(id_user: number, summary: string, description: string): Promise<createTasksResponse> {
        return new Promise(async (resolve) => {
            var reply: createTasksResponse = await task.setTasks(id_user, summary, description);
            resolve(reply);
        });
    };

    return (
        <TaskContext.Provider value={{ loading, getTasks}}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContext;