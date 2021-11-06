import React, {createContext, useState} from 'react';
import { FriendsContextData, FriendsData } from '../interfaces/interfaces';
import * as friends from '../services/friends';

const FriendsContext = createContext<FriendsContextData>({} as FriendsContextData);

export const FriendsProvider: React.FC = ({ children }) => {
    const [loading] = useState(false);
    let responseArray: Array<FriendsData> = [];

    async function getFriends(idUser: number): Promise<Array<FriendsData>> {
        return new Promise(async (resolve) => {
            responseArray = [];
            const friendsReply = await friends.getFriends(idUser);
            friendsReply.map(async oneFriend => {
                responseArray.push(oneFriend);
            });
            
            resolve(responseArray);
        });
    };

    async function getFriendship(idUser: number, idFriend: number): Promise<FriendsData> {
        return new Promise(async (resolve) => {
            const friendReply = await friends.getFriendship(idUser, idFriend);
            
            resolve(friendReply);
        });
    };

    return (
        <FriendsContext.Provider value={{ loading, getFriends, getFriendship }}>
            {children}
        </FriendsContext.Provider>
    );
}

export default FriendsContext;