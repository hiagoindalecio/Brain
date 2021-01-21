import React,{ useContext, FormEvent } from 'react'
import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';
import './Modal.css'
import $ from "jquery";
import { setNotes } from '../../services/notes';

import AuthContext from '../../contexts/auth';

interface ModalProps {
    props : any;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({onClose}) => {
    const { user } = useContext(AuthContext);
    async function handleSubmit(event: FormEvent) {
        const formData = {
            summaryNotes: $("input[type=summary][name=summary]").val() as string,
            descNotes: $("textarea[id=description][name=desc]").val() as string
        }  
        event.preventDefault();
        if (formData.descNotes === '') {
            alert('Você deve Preencher o campo de Descrição!');
        } else if (formData.summaryNotes === '') {
            alert('Você deve preencher o campo de Titulo!');
        }
        else{
            const reply = await setNotes((user ? user.id as number : -1),formData.summaryNotes,formData.descNotes);
            alert(reply.toString());
            onClose();
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
                            <input type="summary" name="summary" className="form-control" id="summary"></input>
                            <label htmlFor="message-text" className='col-form-label'>
                                Nota:
                            </label>
                            <textarea id="description" name="desc" className='form-control'></textarea>
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
