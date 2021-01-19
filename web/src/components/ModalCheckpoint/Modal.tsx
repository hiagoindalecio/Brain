import React,{ useContext, FormEvent } from 'react'
import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';
import './Modal.css'
import $ from "jquery";

import AuthContext from '../../contexts/auth';
import CheckpointsContext from '../../contexts/checkpoints';

interface ModalProps {
    props : any;
    onClose: () => void;
}

    
const Modal: React.FC<ModalProps> = ({onClose}) => {
    const { user } = useContext(AuthContext);
    const { setCheckpoint } = useContext(CheckpointsContext);

    async function handleSubmit(event: FormEvent) {
        const formData = {
            summaryCheck: $("input[type=summary][name=summary]").val() as string,
            descCheck: $("textarea[id=description][name=desc]").val() as string,
            dateCheck: $("input[type=date][id=dateCheck]").val() as string
        }

        if (formData.dateCheck === null) {
            alert('Data inválida!');
        } else if (formData.descCheck === '') {
            alert('Você deve Preencher o campo de Descrição!');
        } else if (formData.summaryCheck === '') {
            alert('Você deve preencher o campo de Titulo!');
        } else {
            const reply = await setCheckpoint((user ? user.id as number : -1),formData.summaryCheck,formData.descCheck,formData.dateCheck);
            alert(reply.message);
            onClose();
        }
        console.log("Userid: " + (user ? user.id as number : -1) + "Data:" + formData.dateCheck + "\n Desc:" + formData.descCheck + "\n Summary:" + formData.summaryCheck);
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
            <div  className={'modal-overlay'} onClick={handleOverlayClick} ref={overlayRef}/>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                            <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="recipient-name" className="col-form-label">
                                Titulo do checkpoint:
                            </label>
                            <input type="summary" name="summary" className="form-control" id="summary"></input>

                            <label htmlFor="message-text" className='col-form-label'>
                                Descrição:
                            </label>
                            <textarea id="description" name="desc" className='form-control'></textarea>
                            <label htmlFor="message-text" className='col-form-label'>
                                Data Limite:
                            </label>
                            <input type="date" id="dateCheck" className="form-control"/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                            <button type="button" name="submit" className="btn btn-primary" onClick={handleSubmit}>Criar Checkpoint</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Modal
