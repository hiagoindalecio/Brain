import React,{ useContext, FormEvent, useState } from 'react'
import './Modal.css'

import AuthContext from '../../contexts/auth';
import CheckpointsContext from '../../contexts/checkpoints';

import ModalMessage from '../../components/ModalMessages/ModalMessages';
import { ModalCheckProps } from '../../interfaces/interfaces';
  
const Modal: React.FC<ModalCheckProps> = ({props, onClose}) => {
    const { user } = useContext(AuthContext);
    const { setCheckpoint, updateCheckpoint } = useContext(CheckpointsContext);
    const [isModalMessageVisible, setIsModalMessageVisible] = useState(false);
    const [done, setDone] = useState(false);
    const [message, setMessage] = useState<string>('');
    const [summary, setSummary] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [dateCheck, setDateCheck] = useState<string>('');

    function handleChange(summa: string | null, descri: string | null, dateChe: string | null) {
        if (summa) {
            setSummary(summa);
        } else if (descri) {
            setDescription(descri);
        } else if (dateChe) {
            setDateCheck(dateChe);
        }
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (dateCheck === '') {
            setMessage('Data inválida!');
            setIsModalMessageVisible(true);
        } else if (description === '') {
            setMessage('Você deve Preencher o campo de Descrição!');
            setIsModalMessageVisible(true);
        } else if (summary === '') {
            setMessage('Você deve preencher o campo de Titulo!');
            setIsModalMessageVisible(true);
        } else {
            if(props.id === -1) {
                const reply = await setCheckpoint((user ? user.id as number : -1), summary, description, dateCheck);
                setMessage(reply.message);
            } else {
                const reply = await updateCheckpoint(props.id, summary, description, dateCheck);
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
        <div className="form-modal-checkpoint">
            <div className="modal" id="exampleModalCenter" role="dialog">
            <div className={'modal-overlay'} onClick={handleOverlayClick} ref={overlayRef}/>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    {isModalMessageVisible ? <ModalMessage props={{message}} onClose={() => {setIsModalMessageVisible(false); if(done) {onClose();}}}></ModalMessage> : null}
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Checkpoint</h5>
                            <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="recipient-name" className="col-form-label">
                                Titulo do checkpoint:
                            </label>
                            <input type="summary" name="summary" className="form-control" id="summary" defaultValue={props.summary} onChange={event => handleChange(event.target.value, null, null)}></input>

                            <label htmlFor="message-text" className='col-form-label'>
                                Descrição:
                            </label>
                            <textarea id="description" name="desc" className='form-control' defaultValue={props.description} onChange={event => handleChange(null, event.target.value, null)}></textarea>
                            <label htmlFor="message-text" className='col-form-label'>
                                Data Limite:
                            </label>
                            <input type="date" id="dateCheck" className="form-control" defaultValue={props.date} onChange={event => handleChange(null, null, event.target.value)}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Fechar</button>
                            <button type="button" name="submit" className="btn btn-primary" onClick={handleSubmit}>Salvar Checkpoint</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Modal
