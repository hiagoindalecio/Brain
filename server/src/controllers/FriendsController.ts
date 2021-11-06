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
        const friendsUser = knex ('friends_user').where('COD_USER', userId)
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

            response.status(200).send(allFriends);    
        } catch (e) {
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
}

export default FriendsController;