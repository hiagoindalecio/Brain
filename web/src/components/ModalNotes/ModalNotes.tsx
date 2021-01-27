import React,{ useContext, FormEvent, useState } from 'react'
import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';
import './Modal.css'
import $ from "jquery";

import NotesContext from '../../contexts/notes'
import AuthContext from '../../contexts/auth';

import ModalMessage from '../../components/ModalMessages/ModalMessages';

interface ModalProps {
    props : {
        id: number, 
        summary: string, 
        description: string
    };
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({props, onClose}) => {
    const { user } = useContext(AuthContext);
    const { setNotes, updateNotes } = useContext(NotesContext);
    const [isModalMessageVisible, setIsModalMessageVisible] = useState(false);
    const [message, setMessage] = useState<string>('');
    const [done, setDone] = useState(false);

    async function handleSubmit() {
        const formData = {
            summaryNotes: $("input[type=summary][name=summary]").val() as string,
            descNotes: $("textarea[id=description][name=desc]").val() as string
        }  
        if (formData.descNotes === '') {
            setMessage('Você deve Preencher o campo de Descrição!');
            setIsModalMessageVisible(true);
        } else if (formData.summaryNotes === '') {
            setMessage('Você deve preencher o campo de Titulo!');
            setIsModalMessageVisible(true);
        } else {
            if(props.id === -1) {
                const reply = await setNotes((user ? user.id as number : -1), formData.summaryNotes, formData.descNotes);
                setMessage(reply.message);
            } else {
                const reply = await updateNotes(props.id ,formData.summaryNotes, formData.descNotes);
                setMessage(reply.message);
            }
            setIsModalMessageVisible(true);
            setDone(true);
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
                            <input type="summary" name="summary" className="form-control" id="summary" defaultValue={props.summary}></input>
                            <label htmlFor="message-text" className='col-form-label'>
                                Nota:
                            </label>
                            <textarea id="description" name="desc" className='form-control' defaultValue={props.description}></textarea>
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
