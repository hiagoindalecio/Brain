import { Request, Response } from 'express';
import knex from '../database/connection'

import taskControler from './TasksController';

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
    tasks: Task[];
}

interface Chekpoint {
    cod: number;
    codUser: number;
    summary: string;
    limitdate: string;
    description: string;
}

class CheckController {
    async index(request: Request, response: Response) {
        const trx = await knex.transaction();
        const general = await trx ('user_chekpoint').select('*');
        try {
            const serializedItems  = general.map( item => { // Percorre e reorganiza o que sera retornado
                return {
                    cod: item.COD_CHECK,
                    codUser: item.COD_USER,
                    summary: item.SUMMARY_CHECK,
                    limitdate: item.DATA_CHECK,
                    description: item.DESCRI_CHECK
                };
            } );
            response.status(200).send(serializedItems);    
        } catch (e) {
            return response.status(400).json({
                cod: -1,
                codUser: -1,
                summary: '',
                limitdate: '',
                description: ''
            });
        }
    } 

    async show(request: Request, response: Response) {
        const { userId } = request.params;
        const checksUser = knex('user_checkpoint').where('COD_USER', userId).orderBy('DATA_CHECK');
        
        try {
            const serializedItems  = (await checksUser).map( item => { // Percorre e reorganiza o que sera retornado
                console.log({
                    cod: item.COD_CHECK,
                    codUser: item.COD_USER,
                    summary: item.SUMMARY_CHECK,
                    limitdate: item.DATA_CHECK,
                    description: item.DESCRI_CHECK
                });
                return {
                    cod: item.COD_CHECK,
                    codUser: item.COD_USER,
                    summary: item.SUMMARY_CHECK,
                    limitdate: item.DATA_CHECK,
                    description: item.DESCRI_CHECK
                };
            } );
            response.status(200).send(serializedItems);    
        } catch (e) {
            response.status(400).json({
                cod: -1,
                codUser: -1,
                summary: '',
                limitdate: '',
                description: ''
            });
        }
    }

    async showOld(request: Request, response: Response) {
        const { userId } = request.params;
        const checksUser = await knex('user_checkpoint').where('COD_USER', userId).orderBy('DATA_CHECK');
        let tasks: Array<Task> = [];
        let responseArray: Array<CheckpointsData> = [];

        try {
            const serializedChecks: Array<Chekpoint> = checksUser.map( item => { // Percorre e reorganiza o que sera retornado
                return {
                    cod: item.COD_CHECK,
                    codUser: item.COD_USER,
                    summary: item.SUMMARY_CHECK,
                    limitdate: item.DATA_CHECK,
                    description: item.DESCRI_CHECK
                };
            });

            serializedChecks.map(async oneCheckpoint => {
                const tasksCheck = await knex('checkpoint_tasks').where('COD_CHECK', oneCheckpoint.cod)
                const tasksReply: Task[] = tasksCheck.map( item => { // Percorre e reorganiza o que sera retornado
                    return {
                        idTask: item.COD_TASK,
                        idCheck: item.COD_CHECK,
                        summary: item.SUMMARY_TASK,
                        desc: item.DESCRI_TASK,
                        status: item.STATUS_TASK
                    }
                });
                tasksReply.map(oneTask => {
                    tasks.push(oneTask);
                });
                responseArray.push({...oneCheckpoint, tasks});
                tasks = [];
            });
            console.log(responseArray);
            response.status(200).send(responseArray);
        } catch (e) {
            response.status(400).json({
                cod: -1,
                codUser: -1,
                summary: '',
                limitdate: '',
                description: '',
                tasks: [{}]
            });
        }
    }

    async create(request: Request, response: Response) {
        const { id_user, summary, description, limitdate } = request.body;
        const checkpoint = {
            COD_USER : id_user,
            SUMMARY_CHECK : summary,
            DESCRI_CHECK : description,
            DATA_CHECK : limitdate
        }
        try {
            const insertedCheckpoint = await knex('user_checkpoint').insert(checkpoint);
            return response.status(201).json({
                id: insertedCheckpoint[0],
                name: insertedCheckpoint[1],
                message: 'New checkpoint created successfully'
            });
        } catch (e) {
            console.log(e);
            return response.status(400).json({
                chekpoint: {
                    id: -1,
                    name: '',
                    message: 'A failure happened during the chekpoint creation.'
                }
            });
        }
    };

}

export default CheckController;

