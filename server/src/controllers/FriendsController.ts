import knex from '../database/connection';
import { Request, Response } from 'express';
import bcrypt  from 'bcrypt';

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
        const trx = await knex.transaction();
        const friendsUser = await trx ('friends_user').where('COD_USER', userId)
        try {
            const serializedItems  = friendsUser.map( async item => { // Percorre e reorganiza o que sera retornado
                var nameFriend = "";
                var profPic = "";
                (await knex('user_table').where('COD_USER', item.COD_FRIEND)).map( async oneFriend => {
                    nameFriend = oneFriend.NAME_USER as string;
                    profPic = oneFriend.IMAGE as string;
                });
                
                const objReturn = {
                    cod_friend: item.COD_FRIEND,
                    name_friend: nameFriend,
                    pic_friend: profPic,
                    accepted: item.ACCEPTED
                }
                return objReturn;
            } );
            response.status(200).send(serializedItems);    
        } catch (e) {
            response.status(400).json({
                cod_friend: -1,
                cod_user: -1,
                accepted: -1
            });
        }
    }
}

export default FriendsController;