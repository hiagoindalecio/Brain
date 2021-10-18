import { Request, Response } from 'express';
import knex from '../database/connection'


class MemoryController {
    async index(response: Response) {
        const trx = await knex.transaction();
        const general = await trx ('memory_user').select('*');
        
        try{
            const serializedItems  = general.map( item => { // Percorre e reorganiza o que sera retornado
                return {
                    idMemory: item.COD_MEMORY,
                    idUser: item.COD_USER,
                    summary: item.SUMMARY_MEMORY,
                    desc: item.DESC_MEMORY
                };
            } );
            response.status(200).send(serializedItems);    
        } catch (e) {
            return response.status(400).json({ mensagem: `Error during the Memorys select. ${e}`});
        }
        

    } 


    async show(request: Request, response: Response) {
        const { userId } = request.params;
        const trx = await knex.transaction();
        const memorysCheck = await trx ('memory_user').where('COD_USER', userId)
        
        try{
            const serializedItems  = memorysCheck.map( item => { // Percorre e reorganiza o que sera retornado
                return {
                    idMemory: item.COD_MEMORY,
                    idUser: item.COD_USER,
                    summary: item.SUMMARY_MEMORY,
                    desc: item.DESC_MEMORY
                };
            } );
            response.status(200).send(serializedItems);    
        } catch (e) {
            response.status(400).json({ mensagem: `Error during the Memorys select. ${e}`});
        }
    }


    async create(request: Request, response: Response) {//completed
        const { userCheck, summaryMemory, descMemory } = request.body;
        const memory = {
            COD_CHECK    : userCheck,
            SUMMARY_TASK : summaryMemory,
            DESCRI_TASK  : descMemory
        }
        try{
            const insertedMemory = await knex('memory_user').insert(memory);
            return response.status(201).json({
                idUser: insertedMemory[0],
                summary: insertedMemory[1],
                message: 'New Memory created successfully'
            });
        } catch (e) {
            return response.status(400).json({ mensagem: `Error during the Memorys creation. ${e}`});
        }
    };


}

export default MemoryController;

