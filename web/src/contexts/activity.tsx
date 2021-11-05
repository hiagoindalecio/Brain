import React, {createContext, useState} from 'react';
import { ActivityContextData, activityResponse } from '../interfaces/interfaces';
import * as activity from '../services/activity';

const ActivityContext = createContext<ActivityContextData>({} as ActivityContextData);

export const ActivityProvider: React.FC = ({ children }) => {
    const [loading] = useState(false);
    let responseArray: Array<activityResponse> = [];

    async function getFriendsActivity(idUser: number): Promise<Array<activityResponse>> {
        return new Promise(async (resolve) => {
            responseArray = [];
            const activitiesReply = await activity.getFriendsActivity(idUser);
            activitiesReply.map(async oneAct => {
                responseArray.push(oneAct);
            });
            resolve(responseArray);
        });
    };
    
    async function getActivityByUser(idUser: string): Promise<Array<activityResponse>> {
        return new Promise(async (resolve) => {
            responseArray = [];
            const activitiesReply = await activity.getByUser(idUser);
            activitiesReply.map(async oneAct => {
                responseArray.push(oneAct);
            });
            resolve(responseArray);
        });
    };

    return (
        <ActivityContext.Provider value={{ loading, getFriendsActivity, getActivityByUser }}>
            {children}
        </ActivityContext.Provider>
    );
}


export default ActivityContext;