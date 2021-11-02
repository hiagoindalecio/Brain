import React,{ useContext, FormEvent, useState } from 'react'
import './Modal.css'

import TaskContext from '../../contexts/tasks';

import ModalMessage from '../../components/ModalMessages/ModalMessages';
import { ModalTasksProps } from '../../interfaces/interfaces';

const Modal: React.FC<ModalTasksProps> = ({props, onClose}) => {
    const { setTasks, updateTask } = useContext(TaskContext);
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

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (description === '') {
            setMessage('Você deve Preencher o campo de Descrição!');
            setIsModalMessageVisible(true);
        } else if (summary === '') {
            setMessage('Você deve preencher o campo de Titulo!');
            setIsModalMessageVisible(true);
        } else {
            if(props.id === -1) {
                const reply = await setTasks(props.idCheck, summary, description);
                setMessage(reply.message);
            } else {
                const reply = await updateTask(props.id, summary, description);
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
                                <h5 className="modal-title" id="exampleModalLongTitle">Task</h5>
                                <button type="button" className="close" onClick={onClose}>
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="recipient-name" className="col-form-label">
                                    Titulo da Task:
                                </label>
                                <input type="summary" name="summary" className="form-control" id="summary" defaultValue={props.summary} onChange={event => handleChange(event.target.value, null)}></input>
                                <label htmlFor="message-text" className='col-form-label'>
                                    Descrição:
                                </label>
                                <textarea id="description" name="desc" className='form-control' defaultValue={props.description} onChange={event => handleChange(null, event.target.value)}></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>Fechar</button>
                                <button type="button" name="submit" className="btn btn-primary" onClick={handleSubmit}>Salvar Task</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Modal
