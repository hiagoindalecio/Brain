import knex from '../database/connection';
import { Request, Response } from 'express';
import { friends } from '../interfaces/interfaces';

class FriendsController {
    async index(request: Request, response: Response){
        
        const friends = await knex('friends_user').select('*'); //Select no banco SELECT * FROM tb_items
        const serializedItems  = friends.map( item => { // Percorre e reorganiza o que sera retornado
            return {
                cod_friend: item.COD_FRIEND,
                cod_user: item.COD_USER,
                accepted: item.ACCEPTED
            };
        } );
        response.status(200).send(serializedItems);
    };

    async show(request: Request, response: Response) {
        
        const { userId } = request.params;
        const friendsUser = knex ('friends_user')
                .where('COD_USER', userId);
        try {
            const serializedItems = (await friendsUser).map( item => { // Percorre e reorganiza o que sera retornado
                return {
                    cod_friend: item.COD_FRIEND,
                    accepted: item.ACCEPTED
                };
            });
            let allFriends: Array<friends> = [];
            for (var i = 0;i < serializedItems.length; i++) {
                allFriends.push(await knex('user_table').where('COD_USER', serializedItems[i].cod_friend).first().then(user => {
                    return {
                        cod_friend: serializedItems[i].cod_friend,
                        name_friend: user.NAME_USER as string,
                        pic_friend: `http://localhost:3334/uploads/${user.IMAGE as string}`,
                        accepted: serializedItems[i].accepted,
                        user_online: user.USER_ONLINE
                    };
                }));
            }

            allFriends.sort(function(x, y) { //sorting by user_online first
                // true values first
                return (x.user_online === y.user_online)? 0 : x.user_online? -1 : 1;
            })

            response.status(200).send(allFriends);    
        } catch (e) {
            console.log(e)
            response.status(400).json({
                cod_friend: -1,
                name_friend: '',
                cod_user: -1,
                pic_friend: '',
                accepted: -1
            });
        }
    }

    async friendRequests(request: Request, response: Response) {
        
        const { userId } = request.params;
        const friendRequests = await knex ('friends_user')
            .where('friends_user.COD_FRIEND', userId)
            .leftJoin('user_table', 'user_table.COD_USER', 'friends_user.COD_USER')
            .where('friends_user.ACCEPTED', false);

        try {
            const friend = friendRequests.map(friend => {
                return {
                    cod_friend: friend.COD_USER,
                    name_friend: friend.NAME_USER,
                    pic_friend: `http://localhost:3334/uploads/${friend.IMAGE as string}`,
                    accepted: friend.ACCEPTED,
                    user_online: friend.USER_ONLINE
                }
            })

            if (friend.length > 0)
                response.status(200).send(friend);
            else
                response.status(200).json({
                    cod_friend: -1,
                    name_friend: '',
                    cod_user: -1,
                    pic_friend: '',
                    accepted: -1
                });
        } catch (e) {
            console.log(e)
            response.status(400).json({
                cod_friend: -1,
                name_friend: '',
                cod_user: -1,
                pic_friend: '',
                accepted: -1
            });
        }
    }

    async checkFriend(request: Request, response: Response) {
        
        const { userId, friendId } = request.params;
        const friendUser = await knex ('friends_user')
            .where('friends_user.COD_USER', userId)
            .where('COD_FRIEND', friendId)
            .first()
            .leftJoin('user_table', 'user_table.COD_USER', 'friends_user.COD_FRIEND');

        try {
            const friend = {
                cod_friend: friendUser.COD_FRIEND,
                name_friend: friendUser.NAME_USER,
                pic_friend: `http://localhost:3334/uploads/${friendUser.IMAGE as string}`,
                accepted: friendUser.ACCEPTED,
                user_online: friendUser.USER_ONLINE
            };

            response.status(200).send(friend);    
        } catch (e) {
            response.status(200).json({
                cod_friend: -1,
                name_friend: '',
                cod_user: -1,
                pic_friend: '',
                accepted: -1
            });
        }
    }

    async findFriendRequest(request: Request, response: Response) {
        
        const { userId, friendId } = request.params;
        const friendUser = await knex ('friends_user')
            .where('friends_user.COD_FRIEND', userId)
            .where('friends_user.COD_USER', friendId)
            .first()
            .leftJoin('user_table', 'user_table.COD_USER', 'friends_user.COD_USER');

        try {
            const friend = {
                cod_friend: friendUser.COD_FRIEND,
                name_friend: friendUser.NAME_USER,
                pic_friend: `http://localhost:3334/uploads/${friendUser.IMAGE as string}`,
                accepted: friendUser.ACCEPTED,
                user_online: friendUser.USER_ONLINE
            };

            response.status(200).send(friend);    
        } catch (e) {
            response.status(200).json({
                cod_friend: -1,
                name_friend: '',
                cod_user: -1,
                pic_friend: '',
                accepted: -1
            });
        }
    }

    async addFriend(request: Request, response: Response) {

        const { userId, friendId } = request.body;
        try {
            const friendship = {
                COD_FRIEND: friendId,
                COD_USER: userId,
                ACCEPTED: false
            }
            await knex('friends_user').insert(friendship);

            const serializedResponse = {
                message: 'Pedido de amizade enviado com sucesso.'
            }
            return response.status(201).json(serializedResponse);
        } catch (e) {
            const serializedResponse = {
                message: 'Erro ao enviar pedido de amizade.\n' + e
            }
            return response.status(400).json(serializedResponse);
        }
    }

    async cancelRequest(request: Request, response: Response) {
        
        const { userId, friendId } = request.body;
        try {
            await knex('friends_user')
                .where('COD_USER', userId)
                .where('COD_FRIEND', friendId)
                .delete();

            const serializedResponse = {
                message: 'Pedido de amizade cancelado com sucesso.'
            }
            return response.status(201).json(serializedResponse);
        } catch (e) {
            const serializedResponse = {
                message: 'Erro ao cancelar pedido de amizade.\n' + e
            }
            return response.status(400).json(serializedResponse);
        }
    }

    async declineRequest(request: Request, response: Response) {
        
        const { userId, friendId } = request.body;
        try {
            await knex('friends_user')
                .where('COD_FRIEND', userId)
                .where('COD_USER', friendId)
                .delete();

            const serializedResponse = {
                message: 'Pedido de amizade negado com sucesso.'
            }
            return response.status(201).json(serializedResponse);
        } catch (e) {
            const serializedResponse = {
                message: 'Erro ao negar pedido de amizade.\n' + e
            }
            return response.status(400).json(serializedResponse);
        }
    }

    async acceptRequest(request: Request, response: Response) {
        
        const { userId, friendId } = request.body;
        try {
            await knex('friends_user') // aceita amizade
                .where('COD_FRIEND', userId)
                .where('COD_USER', friendId)
                .update({
                    accepted: true
                });

            const friendship = { // gera amizade para quem está aceitando
                COD_FRIEND: friendId,
                COD_USER: userId,
                ACCEPTED: true
            }
            await knex('friends_user').insert(friendship);

            const serializedResponse = {
                message: 'Pedido de amizade aceito com sucesso.'
            }
            return response.status(201).json(serializedResponse);
        } catch (e) {
            const serializedResponse = {
                message: 'Erro ao aceitar pedido de amizade.\n' + e
            }
            return response.status(400).json(serializedResponse);
        }
    }

    async endFriendship(request: Request, response: Response) {
        
        const { userId, friendId } = request.body;
        try {
            await knex('friends_user')
                .where('COD_FRIEND', userId)
                .where('COD_USER', friendId)
                .delete();
            await knex('friends_user')
                .where('COD_FRIEND', friendId)
                .where('COD_USER', userId)
                .delete();

            const serializedResponse = {
                message: 'Amizade encerrada com sucesso.'
            }
            return response.status(201).json(serializedResponse);
        } catch (e) {
            const serializedResponse = {
                message: 'Erro ao encerrar amizade.\n' + e
            }
            return response.status(400).json(serializedResponse);
        }
    }
}

export default FriendsController;