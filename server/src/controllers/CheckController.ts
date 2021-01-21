import { Request, Response } from 'express';
import knex from '../database/connection'

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
                console.log({
                    cod: item.COD_CHECK,
                    codUser: item.COD_USER,
                    summary: item.SUMMARY_CHECK,
                    limitdate: item.DATA_CHECK,
                    description: item.DESCRI_CHECK,
                    status: item.STATUS_CHECK
                });
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
            return response.status(201).json({
                id: insertedCheckpoint[0],
                name: insertedCheckpoint[1],
                message: 'Novo checkpoint criado com sucesso!'
            });
        } catch (e) {
            console.log(e);
            return response.status(400).json({
                id: -1,
                name: '',
                message: 'Uma falha ocorreu durante a criação do checkpoint :('
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
                if(task_status) {
                    quantas++;
                }
            })
            if (quantas === 0) {
                try {
                    await knex('user_checkpoint').update({STATUS_CHECK: false}).where('COD_CHECK', idCheck);
                    var points = await knex('user_table').select('POINTS_USER').where('COD_USER', userId);
                    var userPoints = 0;
                    points.map(one => {
                        userPoints = one.POINTS_USER
                    })
                    await knex('user_table').update({POINTS_USER: (userPoints + 20)}).where('COD_USER', userId);
                    return response.status(201).json({
                        message: `O checkpoint foi completado com sucesso. \nParabéns você conquistou 20 pontos!`
                    });
                } catch(e) {
                    return response.status(400).json({
                        message: `Um erro ocorreu :(\n${e}`
                    });
                }
            } else {
                return response.status(400).json({
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
                    return response.status(201).json({
                        message: `O checkpoint foi atualizado com sucesso.`
                    });
                }
            })
        } catch(e) {
            return response.status(400).json({
                message: `Um erro ocorreu :(\n${e}`
            });
        }
    }

}

export default CheckController;

