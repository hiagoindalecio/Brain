import { Request, Response } from 'express';
import knex from '../database/connection'


class NotesController {

    async index(request: Request, response: Response) {
        const trx = await knex.transaction();
        const general = await trx ('user_notes').select('*');
        try{
            const serializedItems  = general.map( item => { // Percorre e reorganiza o que sera retornado
                return {
                    idNote: item.COD_NOTE,
                    idUser: item.COD_USER,
                    summary: item.SUMMARY_NOTE,
                    desc: item.DESCRI_NOTE
                };
            } );
            response.status(200).send(serializedItems);    
        } catch (e) {
            return response.status(400).json({
                idNote: -1,
                idUser: -1,
                summary: '',
                desc: `Error: ${e}`
            });
        }
    } 

    async show(request: Request, response: Response) {
        const { userId } = request.params;
        const trx = await knex.transaction();
        const notesUser = await trx ('user_notes').where('COD_USER', userId)
        try{
            const serializedItems  = notesUser.map( item => { // Percorre e reorganiza o que sera retornado
                return {
                    idNote: item.COD_NOTE,
                    idUser: item.COD_USER,
                    summary: item.SUMMARY_NOTE,
                    desc: item.DESCRI_NOTE
                };
            } );
            response.status(200).send(serializedItems);    
        } catch (e) {
            response.status(400).json({
                idNote: -1,
                idUser: -1,
                summary: '',
                desc: `Error: ${e}`
            });
        }
    }

    async create(request: Request, response: Response) {//completed
        const { userId, summaryNote, descNote } = request.body;
        const note = {
            COD_USER      : userId,
            SUMMARY_NOTE : summaryNote,
            DESCRI_NOTE  : descNote,
            POINTS_USER: 0
        }
        try{
            const insertedNote = await knex('user_notes').insert(note);
            return response.status(201).json({
                idUser: insertedNote[0],
                summary: insertedNote[1],
                message: 'New Note created successfully'
            });
        } catch (e) {
            return response.status(400).json({ mensagem: `Error during the Notes creation. ${e.message}`});
        }
    };
}

export default NotesController;

