import React, {createContext, useState} from 'react';
import { createNotesResponse, messageResponse, NotesContexData, NotesData } from '../interfaces/interfaces';
import * as note from '../services/notes';

const NotesContext = createContext<NotesContexData>({} as NotesContexData);

export const NotesProvider: React.FC = ({ children }) => {
    const [loading] = useState(false);
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

    async function setNotes(userId: number, summaryNote: string, descNote: string): Promise<createNotesResponse> {
        return new Promise(async (resolve) => {
            var reply: createNotesResponse = await note.setNotes(userId, summaryNote, descNote);
            resolve(reply);
        });
    };

    async function updateNotes(idNote: number, summaryNote: string, descNote: string): Promise<messageResponse> {
        return new Promise(async (resolve) => {
            var reply: messageResponse = await note.updateNote(idNote, summaryNote, descNote);
            resolve(reply);
        });
    };

    async function drop(idNote: number): Promise<messageResponse> {
        return new Promise(async (resolve) => {
            var reply: messageResponse = await note.drop(idNote);
            resolve(reply);
        });
    };

    return (
        <NotesContext.Provider value={{ loading, getNotes, setNotes, updateNotes, drop }}>
            {children}
        </NotesContext.Provider>
    );
};

export default NotesContext;