import { Request, Response } from 'express';
import knex from '../database/connection';

class ActivityController {
    async index(request: Request, response: Response) {
        const general = await knex.select('*')
            .from('user_activity')
            .leftJoin('activity_type', 'user_activity.COD_TYPE', 'activity_type.COD_TYPE')
            .leftJoin('user_table', 'user_activity.COD_USER', 'user_table.COD_USER')
            .orderBy('UPDATETIME', 'desc');
        try {
            const serializedItems  = general.map( item => { // Percorre e reorganiza o que sera retornado
                return {
                    codActivity: item.COD_ACTIVITY,
                    descriType: item.DESCRI_ACTIVITY_TYPE,
                    nameUser: item.NAME_USER,
                    description: item.DESCRIPTION,
                    updateTime: item.UPDATETIME,
                    profilePic: `http://localhost:3334/uploads/${item.IMAGE}`
                };
            } );

            response.status(200).send(serializedItems);    
        } catch (e) {
            return {
                codActivity: -1,
                descriType: '',
                nameUser: '',
                description: e,
                updateTime: null,
                profilePic: ''
            };
        }
    }

    async getFriendsActivity(request: Request, response: Response) {
        const { userId } = request.params;
        const updatesFriends = await knex.select('*')
            .from('user_activity')
            .leftJoin('friends_user', 'friends_user.COD_FRIEND', 'user_activity.COD_USER')
            .where('friends_user.COD_USER', userId)
            .leftJoin('activity_type', 'user_activity.COD_TYPE', 'activity_type.COD_TYPE')
            .leftJoin('user_table', 'user_activity.COD_USER', 'user_table.COD_USER')
            .orderBy('UPDATETIME', 'desc');

        try {
            const serializedItems  = updatesFriends.map( item => { // Percorre e reorganiza o que sera retornado
                return {
                    codActivity: item.COD_ACTIVITY,
                    descriType: item.DESCRI_ACTIVITY_TYPE,
                    nameUser: item.NAME_USER,
                    description: item.DESCRIPTION,
                    updateTime: item.UPDATETIME,
                    profilePic: `http://localhost:3334/uploads/${item.IMAGE}`
                };
            } );

            response.status(200).send(serializedItems);    
        } catch (e) {
            response.status(400).json({
                codActivity: -1,
                descriType: '',
                nameUser: '',
                description: e,
                updateTime: null,
                profilePic: ''
            });
        }
    }

    async getUserActivity(request: Request, response: Response) {
        const { userId } = request.params;
        const updates = await knex.select('*')
            .from('user_activity')
            .leftJoin('user_table', 'user_activity.COD_USER', 'user_table.COD_USER')
            .leftJoin('activity_type', 'user_activity.COD_TYPE', 'activity_type.COD_TYPE')
            .where('user_activity.COD_USER', userId)
            .orderBy('UPDATETIME', 'desc');

        try {
            const serializedItems = updates.map( item => { // Percorre e reorganiza o que sera retornado
                return {
                    codActivity: item.COD_ACTIVITY,
                    descriType: item.DESCRI_ACTIVITY_TYPE,
                    nameUser: item.NAME_USER,
                    description: item.DESCRIPTION,
                    updateTime: item.UPDATETIME,
                    profilePic: `http://localhost:3334/uploads/${item.IMAGE}`
                };
            } );

            response.status(200).send(serializedItems);    
        } catch (e) {
            response.status(400).json({
                codActivity: -1,
                descriType: '',
                nameUser: '',
                description: e,
                updateTime: null,
                profilePic: ''
            });
        }
    }
}

export default ActivityController;