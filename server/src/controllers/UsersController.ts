import knex from '../database/connection';
import { Request, Response } from 'express';
import bcrypt  from 'bcrypt';
import { string } from '@hapi/joi';

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
        interface User {
            id: number,
            name: string,
            points: Number,
            password: string
        }
        const { email, password } = request.params;
        console.log(`Email input: ${email}\nPassword input: ${password}`);
        const userSelected = await knex('user_table').select('*').where('MAIL_USER', email);
        const serializedUser:User = {
            id: 0,
            name: 'Vazio',
            points: 0,
            password: 'Vazio'
        }
        userSelected.map( user => {
            serializedUser.id = user.COD_USER,
            serializedUser.name = user.NAME_USER,
            serializedUser.points = user.POINTS_USER,
            serializedUser.password = user.PASSWORD_USER
        });
        if (serializedUser.name !== 'Vazio') {
            console.log(`Senha no database:${serializedUser.password}`);
            bcrypt
                .compare(password, serializedUser.password)
                .then(res => {
                    console.log(res);
                    if (res) {
                        const returnSerialized = {
                            id: serializedUser.id,
                            name: serializedUser.name,
                            points: serializedUser.points,
                            message: 'Usuário validado com sucesso!'
                        };
                        return response.status(202).json(returnSerialized);
                    }
                    else {
                        return response.status(400).json({ id:'-1', name:'Vazio', points:'-1', mensagem: `Senha Incorreta.`});
                    }
                })
                .catch(err => {return response.status(400).json({ id:'-1', name:'Vazio', points:'-1', mensagem: `Erro durante a validação da senha.\n${err.message}`});});
        } else {
            console.log(false);
            return response.status(400).json({ id:'-1', name:'Vazio', points:'-1', mensagem: `Usuário não encontrado.`});
        }
        
    };
};

export default UsersControllerr;