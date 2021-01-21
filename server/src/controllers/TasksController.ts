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
            const serializedItems  = tasksCheck.map( item => { // Percorre e reorganiza o que sera retornado
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
        const { idCheck, summaryTask, descTask } = request.body;
        const task = {
            COD_CHECK: idCheck,
            SUMMARY_TASK: summaryTask,
            DESCRI_TASK: descTask,
            STATUS_TASK: true
        }
        try{
            const insertedTask = await knex('checkpoint_tasks').insert(task);
            return response.status(201).json({
                idTask: insertedTask[0],
                message: 'Nova task criada com sucesso!'
            });
        } catch (e) {
            console.log(e);
            return response.status(400).json({
                idTask: -1,
                message: 'Uma falha ocorreu durante a criação da nova task.'
            });
        }
    };

}

export default TasksController;

