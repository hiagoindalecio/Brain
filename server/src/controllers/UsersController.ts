import knex from '../database/connection';
import { Request, Response } from 'express';
import bcrypt  from 'bcrypt';

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
        response.status(200).send(serializedItems);
    };

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const user = await knex('user_table').where('COD_USER', id).first();
        if(!user) {
            return response.status(400).json({ message: 'User not found.'});
        } else {
            const serialized = {
                cod: user.COD_USER,
                name: user.NAME_USER,
                email: user.MAIL_USER,
                password: user.PASSWORD_USER,
                points: user.POINTS_USER
            }
            return response.status(200).json(serialized);
        }
    };

    async create(request: Request, response: Response) {
        const { name, email, password } = request.body;
        bcrypt
            .hash(password, 10)
            .then(async hash => {
                console.log(`Hash: ${hash}`);
                const user = {
                    NAME_USER: name,
                    MAIL_USER: email,
                    PASSWORD_USER: hash,
                    POINTS_USER: 0
                }
                try{
                    const insertedUser = await knex('user_table').insert(user);
                    const serializedResponse = {
                        id: insertedUser[0],
                        name: insertedUser[1],
                        message: 'New user created successfully'
                    }
                    return response.status(201).json(serializedResponse);
                } catch (e) {
                    return response.status(400).json({ mensagem: `Error during the user creation. ${e}`});
                }
            })
            .catch(err => {return response.status(400).json({ mensagem: `Error during the user creation. ${err.message}`})});
    };

    async validateUser(request: Request, response: Response) {
        const { email, password } = request.params;
        const userSelected = await knex('user_table').select('*').where('MAIL_USER', email);
        const serializedUser = userSelected.map( user => {
            return {
                name: user.NAME_USER,
                password: user.PASSWORD_USER
            }; 
        });
        console.log(`Senha no database:${serializedUser[0].password}\nSenha digitada:${password}`);
        bcrypt
            .compare(password, serializedUser[0].password)
            .then(res => {
                console.log(res);
                if (res) {
                    const returnSerialized = {
                        name: serializedUser[0].name,
                        message: 'User validated successfully.'
                    };
                    return response.status(202).json(returnSerialized);
                }
                else {
                    return response.status(400).json({ name:'Null', mensagem: `User not found.`});
                }
            })
            .catch(err => {return response.status(400).json({ mensagem: `Error during the user validation. ${err.message}`});});
        
    };
};

export default UsersControllerr;