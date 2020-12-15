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
                    desc: item.DESC_TASK
                };
            } );
            response.status(200).send(serializedItems);    
        } catch (e) {
            return response.status(400).json({ mensagem: `Error during the Tasks select. ${e}`});
        }
        

    } 


    async show(request: Request, response: Response) {
        const { codCheck } = request.params;
        const trx = await knex.transaction();
        const tasksCheck = await trx ('checkpoint_tasks').where('COD_CHECK', codCheck)
        
        try{
            const serializedItems  = tasksCheck.map( item => { // Percorre e reorganiza o que sera retornado
                return {
                    idTask: item.COD_TASK,
                    idCheck: item.COD_CHECK,
                    summary: item.SUMMARY_TASK,
                    desc: item.DESC_TASK
                };
            } );
            response.status(200).send(serializedItems);    
        } catch (e) {
            response.status(400).json({ mensagem: `Error during the Tasks select. ${e}`});
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
            return response.status(400).json({ mensagem: `Error during the Tasks creation. ${e.message}`});
        }
    };


}

export default TasksController;

