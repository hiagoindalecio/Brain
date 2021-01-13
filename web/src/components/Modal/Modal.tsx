import React,{ useState, PureComponent } from 'react'
import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';
import './Modal.css'

interface ModalProps {
    props : any;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({onClose, props}) => {
    const overlayRef = React.useRef(null);
    const handleOverlayClick = (e : React.MouseEvent<HTMLElement, MouseEvent>) => {
        if(e.target === overlayRef.current){
            onClose();
        }
    };
    return (
        <div>
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
                            <label htmlFor="recipient-name" className="col-form-label">Titulo do checkpoint:</label>
                            <input type="text" className="form-control" id="recipient-name"></input>

                            <label htmlFor="message-text" className='col-form-label'>Descrição:</label>
                            <textarea className='form-control' id="message-text"></textarea>
                            <label htmlFor="message-text" className='col-form-label'>Data Limite:</label>
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
