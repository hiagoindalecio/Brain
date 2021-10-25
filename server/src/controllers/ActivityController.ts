import { Request, Response } from 'express';
import knex from '../database/connection';

class ActivityController {
    async index(request: Request, response: Response) {
        const general = await knex.select('*')
            .from('user_activity')
            .leftJoin('activity_type', 'user_activity.COD_TYPE', 'activity_type.COD_TYPE')
            .leftJoin('user_table', 'user_activity.COD_USER', 'user_table.COD_USER');
        try {
            const serializedItems  = general.map( item => { // Percorre e reorganiza o que sera retornado
                return {
                    codActivity: item.COD_ACTIVITY,
                    descriType: item.DESCRI_ACTIVITY_TYPE,
                    nameUser: item.NAME_USER,
                    description: item.DESCRIPTION,
                    updateTime: item.UPDATETIME
                };
            } );

            response.status(200).send(serializedItems);    
        } catch (e) {
            return {
                codActivity: -1,
                descriType: '',
                nameUser: '',
                description: e,
                updateTime: null
            };
        }
    }

    async findFriends(request: Request, response: Response) {
        const { userId } = request.params;
        const updatesFriends = await knex.select('*')
            .from('user_activity')
            .leftJoin('friends_user', 'friends_user.COD_FRIEND', 'user_activity.COD_USER')
            .where('friends_user.COD_USER', userId)
            .leftJoin('activity_type', 'user_activity.COD_TYPE', 'activity_type.COD_TYPE')
            .leftJoin('user_table', 'user_activity.COD_USER', 'user_table.COD_USER');

        try {
            const serializedItems  = updatesFriends.map( item => { // Percorre e reorganiza o que sera retornado
                return {
                    codActivity: item.COD_ACTIVITY,
                    descriType: item.DESCRI_ACTIVITY_TYPE,
                    nameUser: item.NAME_USER,
                    description: item.DESCRIPTION,
                    updateTime: item.UPDATETIME
                };
            } );

            response.status(200).send(serializedItems);    
        } catch (e) {
            response.status(400).json({
                cod: -1,
                codUser: -1,
                summary: '',
                limitdate: '',
                description: '',
                status: false
            });
        }
    }
}

export default ActivityController;