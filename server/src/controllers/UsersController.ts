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
            return response.status(203).json({ message: 'User not found.'});
        } else {
            const serialized = {
                cod: user.COD_USER,
                name: user.NAME_USER,
                email: user.MAIL_USER,
                password: user.PASSWORD_USER,
                points: user.POINTS_USER,
                image_url: `http://localhost:3334/uploads/${user.IMAGE}`
            }
            return response.status(200).json(serialized);
        }
    };

    async create(request: Request, response: Response) {
        const { name, email, password } = request.body;
        const findEmail = await knex('user_table').where('MAIL_USER', email);
        var achou = false;
        findEmail.map( one => {
            achou = true;
        });
        if(!achou) {
            bcrypt
            .hash(password, 10)
            .then(async hash => {
                var img;
                try {
                    img = request.file.filename
                } catch {
                    img = 'blank-profile.webp'
                }
                const user = {
                    NAME_USER: name,
                    MAIL_USER: email,
                    PASSWORD_USER: hash,
                    POINTS_USER: 0,
                    IMAGE: img
                }
                try{
                    await knex('user_table').insert(user);
                    const serializedResponse = {
                        message: 'Novo usuário criado com sucesso.'
                    }
                    return response.status(201).json(serializedResponse);
                } catch (e) {
                    return response.status(400).json({ message: `Erro durante a criação do usuário! Contacte o suporte. ${e}`});
                }
            })
            .catch(err => {return response.status(400).json({ message: `Erro durante a criação do usuário! Contacte o suporte. ${err.message}`})});
        } else {
            return response.status(203).json({ message: 'O e-mail informado já existe! Por favor utilize um novo endereço de e-mail.' });
        }
        
    };

    async validateUser(request: Request, response: Response) {
        interface User {
            id: number,
            name: string,
            email: string,
            points: Number,
            password: string,
            image_url: string
        }
        const { email, password } = request.params;
        console.log(`Email input: ${email}\nPassword input: ${password}`);
        const userSelected = await knex('user_table').select('*').where('MAIL_USER', email);
        const serializedUser:User = {
            id: -1,
            name: 'Vazio',
            email: 'Vazio',
            points: 0,
            password: 'Vazio',
            image_url: 'Vazio'
        }
        userSelected.map( user => {
            serializedUser.id = user.COD_USER,
            serializedUser.name = user.NAME_USER,
            serializedUser.email = user.MAIL_USER,
            serializedUser.points = user.POINTS_USER,
            serializedUser.password = user.PASSWORD_USER,
            serializedUser.image_url = `http://localhost:3334/uploads/${user.IMAGE}`
        });
        if (serializedUser.name !== 'Vazio') {
            bcrypt
                .compare(password, serializedUser.password)
                .then(res => {
                    console.log(res);
                    if (res) {
                        const returnSerialized = {
                            user: {
                                id: serializedUser.id,
                                name: serializedUser.name,
                                email: serializedUser.email,
                                points: serializedUser.points,
                                password: password,
                                image_url: serializedUser.image_url
                            }
                        };
                        return response.status(202).json(returnSerialized);
                    }
                    else {
                        return response.status(203).json({ 
                                user: {
                                    id: -1,
                                    name: 'Vazio',
                                    email: 'Vazio',
                                    points: -1,
                                    password: 'Vazio',
                                    image_url: 'Vazio'
                                }
                            });
                    }
                })
                .catch(err => {return response.status(400).json({ 
                        user: {
                            id: -1,
                            name: 'Vazio',
                            email: 'Vazio',
                            points: -1,
                            password: 'Vazio',
                            image_url: 'Vazio'
                        }
                    });});
        } else {
            console.log(false);
            return response.status(203).json({ 
                    user: {
                        id: -1, 
                        name: 'Vazio',
                        email: 'Vazio',
                        points: -1,
                        password: 'Vazio',
                        image_url: 'Vazio'
                    }
                });
        }
        
    };
};

export default UsersControllerr;