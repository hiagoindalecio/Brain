import React, { useLayoutEffect, useState } from 'react';
import './styles.css';
import Note from '../../components/NoteObject';
import Modal from '../../components/ModalNotes/ModalNotes';
import { NotesData } from '../../interfaces/interfaces';

const NotesList: React.FC<{notesResponse: Array<NotesData>}> = ({notesResponse}) => {
    const [isModalVsisble, setIsModalVisible] = useState(false);
    const [screen, setScreen] = useState<Array<JSX.Element>>([
        <div style={{ padding: 50 }}>
            <h3>
                Parece que você ainda não possui notas salvas :( <br/>
                Vamos lá, adicione uma nova nota!
            </h3>
        </div>
    ]);

    useLayoutEffect(() => {
        if(notesResponse.length > 0) {
            setScreen(
                [...notesResponse].map((oneNote) => 
                    <Note idNote={oneNote.idNote} idUser={oneNote.idUser} summary={oneNote.summary} desc={oneNote.desc} />
                )
            );
        }
    }, [notesResponse]);

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
                    [...screen].map((elem,  index: number)=> 
                        <div key={index}><br/>{elem}</div>
                    )
                }
                <br />
            </div>
        </fieldset>
        
    )
}

export default NotesList;


