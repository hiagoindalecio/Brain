import React, {createContext, useState} from 'react';
import { completeResponse, createTasksResponse, messageResponse, Task, TasksContextData } from '../interfaces/interfaces';
import * as task from '../services/tasks';

const TaskContext = createContext<TasksContextData>({} as TasksContextData);

export const TasksProvider: React.FC = ({ children }) => {
    const [loading] = useState(false);
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

    async function completeTask(idTask: number): Promise<completeResponse> {
        return new Promise(async (resolve) => {
            var reply: completeResponse = await task.completeTask(idTask);
            resolve(reply);
        });
    }

    return (
        <TaskContext.Provider value={{ loading, getTasks, setTasks, updateTask, completeTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContext;