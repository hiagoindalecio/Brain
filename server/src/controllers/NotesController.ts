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

    async create(request: Request, response: Response) {
        const { userId, summaryNote, descNote } = request.body;
        const note = {
            COD_USER: userId,
            SUMMARY_NOTE: summaryNote,
            DESCRI_NOTE: descNote
        }
        try{
            const insertedNote = await knex('user_notes').insert(note);
            return response.status(201).json({
                idNote: insertedNote[0],
                message: 'Nova nova criada com sucesso!'
            });
        } catch (e) {
            return response.status(400).json({ idNote: -1, mensagem: `Erro durante a criação da nota.  ${e}`});
        }
    };
    
    async update(request: Request, response: Response) {
        const { idNote, summaryNote, descNote } = request.body;
        try {
            knex('user_notes')
            .select('COD_NOTE')
            .where('COD_NOTE', idNote)
            .then(async row => {
                if(!row[0]) {
                    return response.status(400).json({
                        message: `A nota que você está tentando atualizar não existe :(`
                    });
                } else {
                    await knex('user_notes')
                    .update('SUMMARY_NOTE', summaryNote)
                    .update('DESCRI_NOTE', descNote)
                    .where('COD_NOTE', idNote);
                    return response.status(201).json({
                        message: `A nota foi atualizada com sucesso.`
                    });
                }
            })
        } catch(e) {
            return response.status(400).json({
                message: `Um erro ocorreu :(\n${e}`
            });
        }
    }

    async drop(request: Request, response: Response) {
        const { idNote } = request.body;
        try {
            await knex('user_notes')
            .where('COD_NOTE', idNote)
            .del();
            return response.status(200).json({
                message: 'Nota excluída com sucesso.'
            });
        } catch(e) {
            return response.status(400).json({
                message: `Um erro ocorrreu. ${e}`
            });
        }
    }

}

export default NotesController;

