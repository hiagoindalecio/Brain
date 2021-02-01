import React, { useLayoutEffect, useState } from 'react';
import './styles.css';
import Note from '../../components/NoteObject';
import Modal from '../../components/ModalNotes/ModalNotes';
import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';

interface NotesData {
    idNote: number,
    idUser: number,
    summary: string,
    desc: string
}

const NotesList: React.FC<{notesResponse: Array<NotesData>}> = ({notesResponse}) => {
    const [isModalVsisble, setIsModalVisible] = useState(false);
    return (
        <fieldset>
            <div className="presentation">
                <h4>Minhas Notas:<br/><br/></h4>
            </div>
            <button type="button" onClick={() => (setIsModalVisible(true))} className="btn btn-primary btn-lg btn-add">
                Adicionar Nota<br/>
                </button>
            {isModalVsisble ? <Modal props={{id: -1, summary:'', description:''}} onClose={() => {setIsModalVisible(false); window.location.reload();}}></Modal> : null}
            <div>
                {
                    [...notesResponse].map((oneNote, index: number) => 
                        <div key={index}><br/><Note idNote={oneNote.idNote} idUser={oneNote.idUser} summary={oneNote.summary} desc={oneNote.desc} /></div>
                    )
                }
            </div>
        </fieldset>
        
    )
}

export default NotesList;


