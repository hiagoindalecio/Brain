import React, {createContext, useEffect, useState} from 'react';
import * as note from '../services/notes';

interface NotesData {
    idNote: number,
    idUser: number,
    summary: string,
    desc: string
}



interface createNotesResponse {
    id: number,
    name: string,
    message: string
}

interface NotesContexData {
    loading: boolean;
    getNotes: (idUser: number) => Promise<Array<NotesData>>;
    setNotes: (id: number, name: string, message: string) => Promise<createNotesResponse>;
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
    async function setNotes(id_user: number, summary: string, description: string): Promise<createNotesResponse> {
        return new Promise(async (resolve) => {
            var reply: createNotesResponse = await note.setNotes(id_user, summary, description);
            resolve(reply);
        });
    };

    return (
        <NotesContext.Provider value={{ loading, getNotes, setNotes}}>
            {children}
        </NotesContext.Provider>
    );
};

export default NotesContext;