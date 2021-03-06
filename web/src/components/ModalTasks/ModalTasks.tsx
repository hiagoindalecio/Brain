import React,{ useContext, FormEvent, useState } from 'react'
import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';
import './Modal.css'
import $ from "jquery";

import AuthContext from '../../contexts/auth';
import TaskContext from '../../contexts/tasks';

import ModalMessage from '../../components/ModalMessages/ModalMessages';

interface ModalProps {
    props : {
        id: number,
        idCheck: number,
        summary: string,
        description: string
    };
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({props, onClose}) => {
    const { user } = useContext(AuthContext);
    const { setTasks, updateTask } = useContext(TaskContext);
    const [isModalMessageVisible, setIsModalMessageVisible] = useState(false);
    const [message, setMessage] = useState<string>('');
    const [done, setDone] = useState(false);

    async function handleSubmit(event: FormEvent) {
        const formData = {
            summaryNotes: $("input[type=summary][name=summary]").val() as string,
            descNotes: $("textarea[id=description][name=desc]").val() as string
        }  
        event.preventDefault();
        if (formData.descNotes === '') {
            setMessage('Você deve Preencher o campo de Descrição!');
            setIsModalMessageVisible(true);
        } else if (formData.summaryNotes === '') {
            setMessage('Você deve preencher o campo de Titulo!');
            setIsModalMessageVisible(true);
        } else {
            if(props.id === -1) {
                const reply = await setTasks(props.idCheck, formData.summaryNotes, formData.descNotes);
                setMessage(reply.message);
            } else {
                const reply = await updateTask(props.id, formData.summaryNotes, formData.descNotes);
                setMessage(reply.message);
            }
            setDone(true);
            setIsModalMessageVisible(true);
        }
        console.log("Userid: " + (user ? user.id as number : -1) + "\n Desc:" + formData.descNotes + "\n Summary:" + formData.summaryNotes);
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
                                <input type="summary" name="summary" className="form-control" id="summary" defaultValue={props.summary}></input>
                                <label htmlFor="message-text" className='col-form-label'>
                                    Descrição:
                                </label>
                                <textarea id="description" name="desc" className='form-control' defaultValue={props.description}></textarea>
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
