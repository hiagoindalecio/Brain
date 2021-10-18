import { Request, Response } from 'express';
import knex from '../database/connection';

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
        const { idCheck, summary, description } = request.body;
        const task = {
            COD_CHECK: idCheck,
            SUMMARY_TASK: summary,
            DESCRI_TASK: description,
            STATUS_TASK: true
        }

        try {
            const insertedTask = await knex('checkpoint_tasks').insert(task);
            const taskAdded = await knex('checkpoint_tasks').where('COD_TASK', insertedTask[0]);
            const checkpoint = await knex('user_checkpoint').where('COD_CHECK', taskAdded[0].COD_CHECK);

            const activity = {
                COD_TYPE : 6,
                COD_USER : checkpoint[0].COD_USER,
                DESCRIPTION : `${taskAdded[0].SUMMARY_TASK} ao checkpoint ${checkpoint[0].SUMMARY_CHECK}`
            }

            try {
                await knex('user_activity').insert(activity);
                return response.status(201).json({
                    idTask: insertedTask[0],
                    message: 'Nova task criada com sucesso!'
                });
            } catch (e) {
                console.log(e);
                return response.status(400).json({
                    idTask: -1,
                    message: `Uma falha ocorreu durante a criação do log após a criação da nova task.\n${e}`
                });
            }
        } catch (e) {
            console.log(e);
            return response.status(400).json({
                idTask: -1,
                message: `Uma falha ocorreu durante a criação da nova task.\n${e}`
            });
        }
    };

    async update(request: Request, response: Response) {
        const { idTask, summary, description } = request.body;
        try {
            await knex('checkpoint_tasks')
            .select('COD_TASK')
            .where('COD_TASK', idTask)
            .then(async row => {
                if(!row[0]) {
                    return response.status(400).json({
                        message: `A task que você está tentando atualizar não existe :(`
                    });
                } else {
                    await knex('checkpoint_tasks')
                    .update('SUMMARY_TASK', summary)
                    .update('DESCRI_TASK', description)
                    .where('COD_TASK', idTask);

                    const taskChaged = await knex('checkpoint_tasks').where('COD_TASK', idTask);
                    const checkpoint = await knex('user_checkpoint').where('COD_CHECK', taskChaged[0].COD_CHECK);

                    const activity = {
                        COD_TYPE : 8,
                        COD_USER : checkpoint[0].COD_USER,
                        DESCRIPTION : `${taskChaged[0].SUMMARY_TASK} no checkpoint ${checkpoint[0].SUMMARY_CHECK}`
                    }

                    try {
                        await knex('user_activity').insert(activity);
                        return response.status(201).json({
                            message: `A task foi atualizada com sucesso.`
                        });
                    } catch (e) {
                        console.log(e);
                        return response.status(400).json({
                            message: `Um erro ocorreu durante a criação do log após a edição da task :(\n${e}`
                        });
                    }
                }
            })
        } catch(e) {
            return response.status(400).json({
                message: `Um erro ocorreu :(\n${e}`
            });
        }
    }

    async complete(request: Request, response: Response) {
        const { idTask } = request.body;

        try {
            await knex('checkpoint_tasks')
            .update('STATUS_TASK', 0)
            .where('COD_TASK', idTask);
            const checkId = await knex('checkpoint_tasks')
            .select('COD_CHECK')
            .where('COD_TASK', idTask);
            var cod_check = checkId.map(task => { return task.COD_CHECK});
            const userId = await knex('user_checkpoint')
            .select('COD_USER')
            .where('COD_CHECK', cod_check[0]);
            var cod_user = userId.map(check => {return check.COD_USER});
            var points = await knex('user_table')
            .select('POINTS_USER')
            .where('COD_USER', cod_user[0]);
            var userPoints: Array<number> = points.map(one => {return one.POINTS_USER as number})
            await knex('user_table').update({POINTS_USER: (userPoints[0] + 10)}).where('COD_USER', cod_user[0]);

            const taskCompleted = await knex('checkpoint_tasks').where('COD_TASK', idTask);
            const checkpoint = await knex('user_checkpoint').where('COD_CHECK', taskCompleted[0].COD_CHECK);

            const activity = {
                COD_TYPE : 5,
                COD_USER : checkpoint[0].COD_USER,
                DESCRIPTION : `${taskCompleted[0].SUMMARY_TASK} no checkpoint ${checkpoint[0].SUMMARY_CHECK}`
            }

            try {
                await knex('user_activity').insert(activity);
                return response.status(201).json({
                    done:1,
                    message: `Task completa com sucesso. Parabéns você conquistou 10 pontos!`
                });
            } catch (e) {
                console.log(e);
                return response.status(400).json({
                    done:0,
                    message: `Um erro ocorreu durante a criação do log após completar da task :(\n${e}`
                });
            }
        } catch(e) {
            return response.status(400).json({
                done:0,
                message: `Um erro ocorreu :(\n${e}`
            });
        }
    }
}

export default TasksController;

