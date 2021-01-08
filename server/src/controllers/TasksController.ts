import { Request, Response } from 'express';
import knex from '../database/connection'


class TasksController {
    async index(request: Request, response: Response) {
        const trx = await knex.transaction();
        const general = await trx ('checkpoint_tasks').select('*');
        
        try{
            const serializedItems  = general.map( item => { // Percorre e reorganiza o que sera retornado
                return {
                    idTask: item.COD_TASK,
                    idCheck: item.COD_CHECK,
                    summary: item.SUMMARY_TASK,
                    desc: item.DESCRI_TASK,
                    status: item.STATUS_TASK
                };
            } );
            response.status(200).send(serializedItems);    
        } catch (e) {
            return response.status(400).json({
                idTask: -1,
                idCheck: -1,
                summary: '',
                desc: '',
                status: false
            });
        }
        

    } 


    async show(request: Request, response: Response) {
        const { checkpointId } = request.params;
        const tasksCheck = await knex('checkpoint_tasks').where('COD_CHECK', checkpointId)
        
        try{
            const serializedItems  = (await tasksCheck).map( item => { // Percorre e reorganiza o que sera retornado
                console.log({
                    idTask: item.COD_TASK,
                    idCheck: item.COD_CHECK,
                    summary: item.SUMMARY_TASK,
                    desc: item.DESCRI_TASK,
                    status: item.STATUS_TASK
                });
                return {
                    idTask: item.COD_TASK,
                    idCheck: item.COD_CHECK,
                    summary: item.SUMMARY_TASK,
                    desc: item.DESCRI_TASK,
                    status: item.STATUS_TASK
                };
            } );
            
            response.status(200).send(serializedItems);    
        } catch (e) {
            response.status(400).json({
                idTask: 0,
                idCheck: 0,
                summary: '',
                desc: ' ',
                status: false
            });
        }
    }


    async create(request: Request, response: Response) {//completed
        const { userCheck, summaryTask, descTask } = request.body;
        const task = {
            COD_CHECK    : userCheck,
            SUMMARY_TASK : summaryTask,
            DESCRI_TASK  : descTask
        }
        try{
            const insertedTask = await knex('checkpoint_tasks').insert(task);
            return response.status(201).json({
                idUser: insertedTask[0],
                summary: insertedTask[1],
                message: 'New Task created successfully'
            });
        } catch (e) {
            console.log(e);
            return response.status(400).json({
                idUser: -1,
                summary: '',
                message: 'A failure happened during the task creation.'
            });
        }
    };


}

export default TasksController;

