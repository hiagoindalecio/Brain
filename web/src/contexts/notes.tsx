import React, {createContext, useEffect, useState} from 'react';
import * as note from '../services/notes';

interface NotesData {
    idNote: number,
    idUser: number,
    summary: string,
    desc: string
}

interface NotesContexData {
    loading: boolean;
    getNotes: (idUser: number) => Promise<Array<NotesData>>;
}

const NotesContext = createContext<NotesContexData>({} as NotesContexData);

export const NotesProvider: React.FC = ({ children }) => {
    const [loading, setLoading] = useState(false);
    let responseArray: Array<NotesData> = [];

    async function getNotes(idUser: number): Promise<Array<NotesData>> {
        return new Promise(async (resolve) => {
            responseArray = [];
            const noteReply = await note.getNotes(idUser);
            noteReply.map(async oneNote => {
                responseArray.push(oneNote);
            });
            resolve(responseArray);
        });
    };

    return (
        <NotesContext.Provider value={{ loading, getNotes}}>
            {children}
        </NotesContext.Provider>
    );
};

export default NotesContext;