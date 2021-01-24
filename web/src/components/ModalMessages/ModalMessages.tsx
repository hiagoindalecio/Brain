import React from 'react'
import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';
import './Modal.css'

interface ModalProps {
    props : {
        message: string;
    };
    onClose: () => void;
}

const ModalMessage: React.FC<ModalProps> = ({props, onClose}) => {
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
                            <h5 className="modal-title" id="exampleModalLongTitle">Mensagem...</h5>
                            <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h5>{props.message}</h5>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Entendi</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalMessage
