import { Request, Response } from 'express';
import knex from '../database/connection'


class CheckController {
    async index(request: Request, response: Response) {
        const trx = await knex.transaction();
        const general = await trx ('user_chekpoint').select('*');
        
        try{
            const serializedItems  = general.map( item => { // Percorre e reorganiza o que sera retornado
                return {
                    cod: item.COD_CHECK,
                    codUser: item.COD_USER,
                    summary: item.SUMMARY_CHECK,
                    desc: item.DESC_CHECK
                };
            } );
            response.status(200).send(serializedItems);    
        } catch (e) {
            return response.status(400).json({ mensagem: `Error during the checkpoint select. ${e}`});
        }
        

    } 


    async show(request: Request, response: Response) {
        const { userId } = request.params;
        const trx = await knex.transaction();
        const checksUser = await trx ('user_checkpoint').where('COD_USER', userId)
        
        try{
            const serializedItems  = checksUser.map( item => { // Percorre e reorganiza o que sera retornado
                return {
                    cod: item.COD_CHECK,
                    codUser: item.COD_USER,
                    summary: item.SUMMARY_CHECK,
                    desc: item.DESC_CHECK
                };
            } );
            response.status(200).send(serializedItems);    
        } catch (e) {
            response.status(400).json({ mensagem: `Error during the checkpoint select. ${e}`});
        }
    }


    async create(request: Request, response: Response) {
        const { userId, summaryCheck, descCheck } = request.body;
        const checkpoint = {
            COD_USER      : userId,
            SUMMARY_CHECK : summaryCheck,
            DESCRI_CHECK  : descCheck,
            POINTS_USER: 0
        }
        try{
            const insertedCheckpoint = await knex('user_checkpoint').insert(checkpoint);
            return response.status(201).json({
                id: insertedCheckpoint[0],
                name: insertedCheckpoint[1],
                message: 'New checkpoint created successfully'
            });
        } catch (e) {
            return response.status(400).json({ mensagem: `Error during the checkpoint creation. ${e}`});
        }
    };


}

export default CheckController;

