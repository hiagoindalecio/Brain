import React, { useContext, useState } from 'react'
import './Modal.css'

import NotesContex from '../../contexts/notes';

import ModalMessage from '../../components/ModalMessages/ModalMessages';
import { ModalDropNoteProps } from '../../interfaces/interfaces';

const ModalDropNote: React.FC<ModalDropNoteProps> = ({props, onClose}) => {
    const { drop } = useContext(NotesContex);
    const [isModalMessageVisible, setIsModalMessageVisible] = useState(false);
    const [message, setMessage] = useState<string>('');
    const [done, setDone] = useState(false);

    async function dropNote() {
        var reply = await drop(props.idNote);
        setMessage(reply.message);
        setIsModalMessageVisible(true);
        setDone(true);
    }

    const overlayRef = React.useRef(null);
    const handleOverlayClick = (e : React.MouseEvent<HTMLElement, MouseEvent>) => {
        if(e.target === overlayRef.current){
            onClose();
        }
    };

    return (
        <div className="form-modal-notes">
            <div className="modal" id="exampleModalCenter" role="dialog">
            <div  className={'modal-overlay'} onClick={handleOverlayClick} ref={overlayRef}/>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    {isModalMessageVisible ? <ModalMessage props={{message}} onClose={() => {setIsModalMessageVisible(false); if(done) {onClose();}}}></ModalMessage> : null}
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Excluir Nota</h5>
                            <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h5>Tem certeza de que deseja excluir a nota "{props.title}"?</h5>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                            <button type="button" className="btn btn-secondary" onClick={dropNote}>Excluir</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalDropNote
