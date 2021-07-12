import React, {createContext, useState} from 'react';
import * as friends from '../services/friends';

interface FriendsData {
    cod_friend: number,
    name_friend: string,
    pic_friend: string,
    accepted: number
}

interface FriendsContextData {
    loading: boolean;
    getFriends: (idUser: number) => Promise<Array<FriendsData>>;
}

const FriendsContext = createContext<FriendsContextData>({} as FriendsContextData);

export const FriendsProvider: React.FC = ({ children }) => {
    const [loading, setLoading] = useState(false);
    let responseArray: Array<FriendsData> = [];

    async function getFriends(idUser: number): Promise<Array<FriendsData>> {
        return new Promise(async (resolve) => {
            responseArray = [];
            const friendsReply = await friends.getFriends(idUser);
            friendsReply.map(async oneFriend => {
                responseArray.push(oneFriend);
            });
            //console.log(responseArray);
            resolve(responseArray);
        });
    };

    return (
        <FriendsContext.Provider value={{ loading, getFriends }}>
            {children}
        </FriendsContext.Provider>
    );
}

export default FriendsContext;