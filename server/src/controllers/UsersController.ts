import knex from '../database/connection'
import { Request, Response } from 'express'

class UsersControllerr {
    async index(request: Request, response: Response){
        const users = await knex('user_table').select('*'); //Select no banco SELECT * FROM tb_items
        const serializedItems  = users.map( item => { // Percorre e reorganiza o que sera retornado
            return {
                cod: item.COD_USER,
                name: item.NAME_USER,
                email: item.MAIL_USER,
                password: item.PASSWORD_USER
            };
        } );
        response.send(serializedItems);
    };
    async show(request: Request, response: Response) {
        const { id } = request.params;
        const user = await knex('user_table').where('COD_USER', id).first();
        if(!user) {
            return response.status(400).json({ message: 'Client not found.'});
        } else {
            const serialized = {
                cod: user.COD_USER,
                name: user.NAME_USER,
                email: user.MAIL_USER,
                password: user.PASSWORD_USER
            }
            return response.json(serialized);
        }
    }
    /*async create(request: Request, response: Response) {
        const { name, email, password } = request.params;
        try{
            await knex.transaction(trx => {
                return knex.raw(
                    `Call set_Client(${name},${email},${password});` //pegar o retorno desta procedure (validation)
                )
            });
        } catch (e) {
            return response.status(400).json({ mensagem: `Error during the client creation. ${e}`});
        }
    }*/
};
export default UsersControllerr;