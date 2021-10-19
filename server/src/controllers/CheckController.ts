import { Request, Response } from 'express';
import knex from '../database/connection';

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
                    description: item.DESCRI_CHECK,
                    status: item.STATUS_CHECK
                };
            } );
            response.status(200).send(serializedItems);    
        } catch (e) {
            return response.status(400).json({
                cod: -1,
                codUser: -1,
                summary: '',
                limitdate: '',
                description: '',
                status: false
            });
        }
    } 

    async show(request: Request, response: Response) {
        const { userId } = request.params;
        const checksUser = knex('user_checkpoint').where('COD_USER', userId).orderBy('DATA_CHECK');
        
        try {
            const serializedItems  = (await checksUser).map( item => { // Percorre e reorganiza o que sera retornado
                return {
                    cod: item.COD_CHECK,
                    codUser: item.COD_USER,
                    summary: item.SUMMARY_CHECK,
                    limitdate: item.DATA_CHECK,
                    description: item.DESCRI_CHECK,
                    status: item.STATUS_CHECK
                };
            } );
            response.status(200).send(serializedItems);    
        } catch (e) {
            response.status(400).json({
                cod: -1,
                codUser: -1,
                summary: '',
                limitdate: '',
                description: '',
                status: false
            });
        }
    }

    async create(request: Request, response: Response) {
        const { id_user, summary, description, limitdate } = request.body;
        
        const checkpoint = {
            COD_USER : id_user,
            SUMMARY_CHECK : summary,
            DESCRI_CHECK : description,
            DATA_CHECK : limitdate,
            STATUS_CHECK : true
        }
        try {
            const insertedCheckpoint = await knex('user_checkpoint').insert(checkpoint);
            const activity = {
                COD_TYPE : 2,
                COD_USER : id_user,
                DESCRIPTION : checkpoint.SUMMARY_CHECK
            }

            try {
                await knex('user_activity').insert(activity);
                return response.status(201).json({
                    id: insertedCheckpoint[0],
                    name: checkpoint.SUMMARY_CHECK,
                    message: 'Novo checkpoint criado com sucesso!'
                });
            } catch (e) {
                console.log(e);
                return response.status(400).json({
                    id: -1,
                    name: '',
                    message: `Uma falha ocorreu durante a criação do log após a criação do checkpoint :(\n${e}`
                });
            }
        } catch (e) {
            console.log(e);
            return response.status(400).json({
                id: -1,
                name: '',
                message: `Uma falha ocorreu durante a criação do checkpoint :(\n${e}`
            });
        }
    };

    async complete(request: Request, response: Response) {
        const { idCheck } = request.body;
        const check = await knex('user_checkpoint').select('*').where('COD_CHECK', idCheck);
        const userId: number = check[0].COD_USER;
        if (check === undefined) {
            return response.status(400).json({
                message: 'O checkpoint que deseja completar é inválido :('
            });
        } else {
            const allTasks = await knex('checkpoint_tasks').select('STATUS_TASK').where('COD_CHECK', idCheck);
            var quantas = 0;
            [...allTasks].map((task_status) => {
                if(task_status.STATUS_TASK) {
                    quantas++;
                }
            })
            if (quantas === 0) {
                try {
                    await knex('user_checkpoint').update({STATUS_CHECK: false}).where('COD_CHECK', idCheck);
                    var checkpoint = await knex('user_checkpoint').where('COD_CHECK', idCheck);
                    var points = await knex('user_table').select('POINTS_USER').where('COD_USER', userId);
                    var userPoints = 0;
                    points.map(one => {
                        userPoints = one.POINTS_USER
                    })
                    await knex('user_table').update({POINTS_USER: (userPoints + 20)}).where('COD_USER', userId);
                    const activity = {
                        COD_TYPE : 1,
                        COD_USER : userId,
                        DESCRIPTION : checkpoint[0].SUMMARY_CHECK
                    }

                    try {
                        await knex('user_activity').insert(activity);
                        return response.status(201).json({
                            done: 1,
                            message: `Checkpoint completo com sucesso. Parabéns você conquistou 20 pontos!`
                        });
                    } catch (e) {
                        console.log(e);
                        return response.status(400).json({
                            done: 0,
                            message: `Um erro ocorreu durante a criação da log após completar o checkpoint :(\n${e}`
                        });
                    }
                } catch(e) {
                    return response.status(400).json({
                        done: 0,
                        message: `Um erro ocorreu :(\n${e}`
                    });
                }
            } else {
                return response.status(203).json({
                    done: 0,
                    message: `Não foi possível completar o checkpoint pois existem ${quantas} task(s) ainda não completadas.`
                });
            }
        }
    }

    async update(request: Request, response: Response) {
        const { idCheck, summary, description, limitdate } = request.body;
        try {
            knex('user_checkpoint')
            .select('COD_CHECK')
            .where('COD_CHECK', idCheck)
            .then(async row => {
                if(!row[0]) {
                    return response.status(400).json({
                        message: `O checkpoint que você está tentando atualizar não existe :(`
                    });
                } else {
                    await knex('user_checkpoint')
                    .update('SUMMARY_CHECK', summary)
                    .update('DESCRI_CHECK', description)
                    .update('DATA_CHECK', limitdate)
                    .where('COD_CHECK', idCheck);
                    var checkpoint = await knex('user_checkpoint').where('COD_CHECK', idCheck);

                    const activity = {
                        COD_TYPE : 4,
                        COD_USER : checkpoint[0].COD_USER,
                        DESCRIPTION : checkpoint[0].SUMMARY_CHECK
                    }

                    try {
                        await knex('user_activity').insert(activity);
                        return response.status(201).json({
                            message: `O checkpoint foi atualizado com sucesso.`
                        });
                    } catch (e) {
                        console.log(e);
                        return response.status(400).json({
                            message: `Um erro ocorreu na criação da log após a edição do checkpoint :(\n${e}`
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

    async delete(request: Request, response: Response) {
        const { idCheck } = request.body;

        try {
            const checkpoint = await knex('user_checkpoint').where('COD_CHECK', idCheck);
            await knex('checkpoint_tasks').delete().where('COD_CHECK', idCheck);
            await knex('user_checkpoint').delete().where('COD_CHECK', idCheck);

            const activity = {
                COD_TYPE : 3,
                COD_USER : checkpoint[0].COD_USER,
                DESCRIPTION : checkpoint[0].SUMMARY_CHECK
            }

            try {
                await knex('user_activity').insert(activity);
                return response.status(201).json({
                    message: `O checkpoint foi excluído com sucesso.`
                });
            } catch (e) {
                console.log(e);
                return response.status(400).json({
                    message: `Um erro ocorreu na criação da log após a exclusão do checkpoint :(\n${e}`
                });
            }
        } catch (e) {
            return response.status(400).json({
                message: `Um erro ocorreu, verifique o id e tente novamente. ${e}`
            });
        }
    }

}

export default CheckController;
