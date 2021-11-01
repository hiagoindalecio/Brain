import React,{ useContext, useState } from 'react'
import './Modal.css'

import NotesContext from '../../contexts/notes'
import AuthContext from '../../contexts/auth';

import ModalMessage from '../../components/ModalMessages/ModalMessages';
import { ModalNotesProps } from '../../interfaces/interfaces';

const Modal: React.FC<ModalNotesProps> = ({props, onClose}) => {
    const { user } = useContext(AuthContext);
    const { setNotes, updateNotes } = useContext(NotesContext);
    const [isModalMessageVisible, setIsModalMessageVisible] = useState(false);
    const [message, setMessage] = useState<string>('');
    const [done, setDone] = useState(false);
    const [summary, setSummary] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    function handleChange(summa: string | null, descri: string | null) {
        if (summa) {
            setSummary(summa);
        } else if (descri) {
            setDescription(descri);
        }
    }

    async function handleSubmit() {
        if (description === '') {
            setMessage('Você deve Preencher o campo de Descrição!');
            setIsModalMessageVisible(true);
        } else if (summary === '') {
            setMessage('Você deve preencher o campo de Titulo!');
            setIsModalMessageVisible(true);
        } else {
            if(props.id === -1) {
                const reply = await setNotes((user ? user.id as number : -1), summary, description);
                setMessage(reply.message);
            } else {
                const reply = await updateNotes(props.id, summary, description);
                setMessage(reply.message);
            }
            setDone(true);
            setIsModalMessageVisible(true);
        }
    };

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
                            <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                            <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="recipient-name" className="col-form-label">
                                Titulo da Nota:
                            </label>
                            <input type="summary" name="summary" className="form-control" id="summary" defaultValue={props.summary} onChange={event => handleChange(event.target.value, null)}></input>
                            <label htmlFor="message-text" className='col-form-label'>
                                Nota:
                            </label>
                            <textarea id="description" name="desc" className='form-control' defaultValue={props.description} onChange={event => handleChange(null, event.target.value)}></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Fechar</button>
                            <button type="button" name="submit" className="btn btn-primary" onClick={handleSubmit}>Salvar Nota</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Modal
