import { Request, Response } from 'express';
import knex from '../database/connection'


class CheckController {
    async index(request: Request, response: Response) {
        const trx = await knex.transaction();
        const general = await trx ('user_chekpoint').select('*');
        try{
            const serializedItems  = general.map( item => { // Percorre e reorganiza o que sera retornado
                return {
                    chekpoint: {
                        cod: item.COD_CHECK,
                        codUser: item.COD_USER,
                        summary: item.SUMMARY_CHECK,
                        limitdate: item.DATA_CHECK,
                        description: item.DESCRI_CHECK
                    }
                };
            } );
            response.status(200).send(serializedItems);    
        } catch (e) {
            return response.status(400).json({
                    chekpoint: {
                    cod: 0,
                    codUser: 0,
                    summary: 'Vazio',
                    limitdate: 'Vazio',
                    description: 'Vazio'
                }
            });
        }
    } 

    async show(request: Request, response: Response) {
        const { userId } = request.params;
        const checksUser = knex('user_checkpoint').where('COD_USER', userId)
        
        try{
            const serializedItems  = (await checksUser).map( item => { // Percorre e reorganiza o que sera retornado
                return {
                    chekpoint: {
                        cod: item.COD_CHECK,
                        codUser: item.COD_USER,
                        summary: item.SUMMARY_CHECK,
                        limitdate: item.DATA_CHECK,
                        description: item.DESCRI_CHECK
                    }
                };
            } );
            response.status(200).send(serializedItems);    
        } catch (e) {
            response.status(400).json({
                chekpoint: {
                    cod: 0,
                    codUser: 0,
                    summary: 'Vazio',
                    limitdate: 'Vazio',
                    description: 'Vazio'
                }
            });
        }
    }

    async showOrderedByDate(request: Request, response: Response) {
        const { userId } = request.params;
        const trx = await knex.transaction();
        const checksUser = await trx ('user_checkpoint').where('COD_USER', userId).orderBy('DATA_CHECK').limit(3);
        try{
            const serializedItems  = checksUser.map( item => { // Percorre e reorganiza o que sera retornado
                return {
                    chekpoint: {
                        cod: item.COD_CHECK,
                        codUser: item.COD_USER,
                        summary: item.SUMMARY_CHECK,
                        limitdate: item.DATA_CHECK,
                        description: item.DESCRI_CHECK
                    }
                };
            } );
            response.status(200).send(serializedItems);    
        } catch (e) {
            response.status(400).json({
                chekpoint: {
                    cod: 0,
                    codUser: 0,
                    summary: 'Vazio',
                    limitdate: 'Vazio',
                    description: 'Vazio'
                }
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
        try{
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
                    cod: 0,
                    codUser: 0,
                    summary: 'Vazio',
                    limitdate: 'Vazio',
                    description: 'Vazio'
                }
            });
        }
    };


}

export default CheckController;

