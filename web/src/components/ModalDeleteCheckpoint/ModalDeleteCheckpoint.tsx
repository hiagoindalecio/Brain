import React, { useContext, useState } from 'react'
import './Modal.css'

import CheckpointsContext from '../../contexts/checkpoints';

import ModalMessage from '../../components/ModalMessages/ModalMessages';
import { ModalDeleteCheckProps } from '../../interfaces/interfaces';

const ModalCompleteCheckpoint: React.FC<ModalDeleteCheckProps> = ({props, onClose}) => {
    const { deleteCheckpoint } = useContext(CheckpointsContext);
    const [isModalMessageVisible, setIsModalMessageVisible] = useState(false);
    const [message, setMessage] = useState<string>('');

    async function deleteCheck() {
        var reply = await deleteCheckpoint(props.idCheck);
        setMessage(reply.message);
        setIsModalMessageVisible(true);
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
                    {isModalMessageVisible ? <ModalMessage props={{message}} onClose={() => {setIsModalMessageVisible(false); onClose();}}></ModalMessage> : null}
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Excluir Checkpoint</h5>
                            <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h5>Tem certeza de que deseja excluir o checkpoint "{props.title}"?</h5>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                            <button type="button" className="btn btn-secondary" onClick={deleteCheck}>Excluir</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalCompleteCheckpoint
