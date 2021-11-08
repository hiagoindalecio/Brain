import React, {createContext, useState} from 'react';
import { FriendsContextData, FriendsData, messageResponse } from '../interfaces/interfaces';
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

    async function getFriendshipRequests(idUser: string): Promise<FriendsData[]> {
        return new Promise(async (resolve) => {
            const friendReply = await friends.getFriendshipRequests(idUser);
            
            resolve(friendReply);
        });
    };

    async function getFriendshipRequest(idUser: string, idFriend: string): Promise<FriendsData> {
        return new Promise(async (resolve) => {
            const friendReply = await friends.getFriendshipRequest(idUser, idFriend);
            
            resolve(friendReply);
        });
    };

    async function addNewFriend(idUser: string, idFriend: string): Promise<messageResponse> {
        return new Promise(async (resolve) => {
            const friendReply = await friends.addFriend(idUser, idFriend);
            
            resolve(friendReply);
        });
    };

    async function cancelFriendRequest(idUser: string, idFriend: string): Promise<messageResponse> {
        return new Promise(async (resolve) => {
            const friendReply = await friends.cancelRequest(idUser, idFriend);
            
            resolve(friendReply);
        });
    };

    async function declineFriendRequest(idUser: string, idFriend: string): Promise<messageResponse> {
        return new Promise(async (resolve) => {
            const friendReply = await friends.declineRequest(idUser, idFriend);
            
            resolve(friendReply);
        });
    };

    async function acceptFriendRequest(idUser: string, idFriend: string): Promise<messageResponse> {
        return new Promise(async (resolve) => {
            const friendReply = await friends.acceptRequest(idUser, idFriend);
            
            resolve(friendReply);
        });
    };

    async function endFriendship(idUser: string, idFriend: string): Promise<messageResponse> {
        return new Promise(async (resolve) => {
            const friendReply = await friends.endFriendship(idUser, idFriend);
            
            resolve(friendReply);
        });
    };

    return (
        <FriendsContext.Provider value={{ loading, getFriends, getFriendship, addNewFriend, getFriendshipRequests, getFriendshipRequest, cancelFriendRequest, declineFriendRequest, acceptFriendRequest, endFriendship }}>
            {children}
        </FriendsContext.Provider>
    );
}

export default FriendsContext;