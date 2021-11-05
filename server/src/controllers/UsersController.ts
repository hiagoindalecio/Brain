import knex from '../database/connection';
import { Request, Response } from 'express';
import bcrypt  from 'bcrypt';

class UsersControllerr {
    async index(request: Request, response: Response){
        const users = await knex('user_table').select('*'); //Select no banco SELECT * FROM user_table
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
            return response.status(203).json({ message: 'Usuário não encontrado'});
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

    async showByName(request: Request, response: Response) {
        const { name, myId } = request.params;
        const users = await knex('user_table').where('NAME_USER', 'rlike', name).whereNot('COD_USER', myId);

        if(!users || users.length == 0) {
            return response.status(203).json({ message: 'Usuário não encontrado'});
        } else {
            const serializedItems  = users.map( item => { // Percorre e reorganiza o que sera retornado
                return {
                    cod: item.COD_USER,
                    name: item.NAME_USER,
                    email: item.MAIL_USER,
                    points: item.POINTS_USER,
                    profile_pic: `http://localhost:3334/uploads/${item.IMAGE}`
                };
            } );
            return response.status(200).json(serializedItems);
        }
    };

    async showByCod(request: Request, response: Response) {
        const { cod } = request.params;
        const user = await knex('user_table').where('COD_USER', cod).first();

        if(!user) {
            return response.status(203).json({ message: 'Usuário não encontrado'});
        } else {
            const serializedItem  = (user: { COD_USER: any; NAME_USER: any; MAIL_USER: any; IMAGE: any; POINTS_USER: any; }) => { // Percorre e reorganiza o que sera retornado
                return {
                    cod: user.COD_USER,
                    name: user.NAME_USER,
                    email: user.MAIL_USER,
                    points: user.POINTS_USER,
                    profile_pic: `http://localhost:3334/uploads/${user.IMAGE}`
                };
            };
            return response.status(200).json(serializedItem(user));
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
                try {
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

    async update(request: Request, response: Response) {
        interface User {
            id: number,
            name: string,
            password: string,
            image_url: string
        }
        var userReply: User = {
            id: -1,
            name: '',
            password: '',
            image_url: ''
        };
        const { id, name, password } = request.body;
        const fs = require('fs');
        //Verify user
        const userSel = await knex('user_table').select('*').where('COD_USER', id);
        var user_id = -1;
        var current_img: string = '';
        userSel.map(user => {
            user_id = user.COD_USER,
            current_img = user.IMAGE;
        });
        if(user_id === id as unknown as number) {
            var img: string;
            try {
                img = request.file.filename;
                if(current_img != 'blank-profile.webp') {
                    fs.unlink(`./uploads/${current_img}`, (err: string) => {
                        if (err) {
                            console.error(err)
                            return
                        }
                        //file removed
                    });
                }
            } catch {
                img = current_img
            }
            try {
                if(password != null) {
                    bcrypt
                    .hash(password, 10)
                    .then(async hash => {
                        if(name != null) {
                            await knex('user_table')
                            .where('COD_USER', id)
                            .update({
                                NAME_USER: name,
                                PASSWORD_USER: hash,
                                IMAGE: img
                            });
                        } else {
                            await knex('user_table')
                            .where('COD_USER', id)
                            .update({
                                PASSWORD_USER: hash,
                                IMAGE: img
                            });
                        }
                    })
                    .catch(err => {
                        return response.status(400).json({
                            message: `Password conversion error. ${err}`,
                            user: {
                                userReply
                            }
                        });
                    });
                } else if (name != null) {
                    await knex('user_table')
                    .where('COD_USER', id)
                    .update({
                        NAME_USER: name,
                        IMAGE: img
                    });
                } else {
                    await knex('user_table')
                    .where('COD_USER', id)
                    .update({
                        IMAGE: img
                    });
                }
                const reply = await knex('user_table').select('*').where('COD_USER', id);
                reply.map(user => {
                    userReply.id = user.COD_USER,
                    userReply.name = user.NAME_USER,
                    userReply.password = user.PASSWORD_USER,
                    userReply.image_url = `http://localhost:3334/uploads/${user.IMAGE}`
                });
                return response.status(200).json({
                    message: 'O usuário foi modificado com sucesso',
                    userReply
                });
            } catch {
                return response.status(500).json({
                        message: 'Erro de querie, por favor contacte o suporte',
                        userReply
                });
            }
        } else {
            return response.status(400).json({
                message: 'Usuário não encontrado',
                userReply
            });
        }
    }

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
        const userSelected = await knex('user_table').select('*').where('MAIL_USER', email);
        const serializedUser:User = {
            id: -1,
            name: 'Vazio',
            email: 'Vazio',
            points: 0,
            password: 'Vazio',
            image_url: 'Vazio'
        };
        userSelected.map( user => {
            serializedUser.id = user.COD_USER,
            serializedUser.name = user.NAME_USER,
            serializedUser.email = user.MAIL_USER,
            serializedUser.points = user.POINTS_USER,
            serializedUser.password = user.PASSWORD_USER,
            serializedUser.image_url = `http://localhost:3334/uploads/${user.IMAGE}`
        });
        
        if (serializedUser.name !== 'Vazio') {
            await knex('user_table')
                .where('COD_USER', serializedUser.id)
                .update({
                    USER_ONLINE: 1
                });
            bcrypt
                .compare(password, serializedUser.password)
                .then(res => {
                    if (res) {
                        const returnSerialized = {
                            user: {
                                id: serializedUser.id,
                                name: serializedUser.name,
                                email: serializedUser.email,
                                points: serializedUser.points,
                                password: password,
                                image_url: serializedUser.image_url,
                                user_online: 1
                            }
                        };
                        return response.status(202).json(returnSerialized);
                    } else {
                        return response.status(203).json({ 
                                user: {
                                    id: -1,
                                    name: 'Vazio',
                                    email: 'Vazio',
                                    points: -1,
                                    password: 'Vazio',
                                    image_url: 'Vazio',
                                    user_online: 0
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
                            image_url: 'Vazio',
                            user_online: 0
                        }
                    })});
        } else {
            return response.status(203).json({ 
                user: {
                    id: -1, 
                    name: 'Vazio',
                    email: 'Vazio',
                    points: -1,
                    password: 'Vazio',
                    image_url: 'Vazio',
                    user_online: 0
                }
            });
        }
    }

    async logoff(request: Request, response: Response) {
        var id = -1;
        const { email, password } = request.params;
        const userSelected = await knex('user_table').select('*').where('MAIL_USER', email).first();
        id = userSelected.COD_USER;

        if (id !== -1) {
            await knex('user_table')
                .where('COD_USER', id)
                .update({
                    USER_ONLINE: 0
                });
            bcrypt
                .compare(password, userSelected.PASSWORD_USER)
                .then(async res => {
                    if (res) {
                        try {
                            await knex('user_table')
                            .where('COD_USER', id)
                            .update({
                                USER_ONLINE: 0
                            })
                            return response.status(200).json({ 
                                id, 
                                message: 'Usuário deslogado.'
                            })
                        } catch (err) {
                            return response.status(400).json({
                                id, 
                                message: err
                            })
                        }
                    } else {
                        return response.status(400).json({
                            id, 
                            message: 'Usuário não autenticado com os dados informados.'
                        })
                    }
                })
                .catch(err => {
                    return response.status(400).json({
                        id, 
                        message: err.message
                    })
                })
        } else {
            return response.status(400).json({
                id, 
                message: 'Usuário não encontrado.'
            })
        }
    }
}

export default UsersControllerr;