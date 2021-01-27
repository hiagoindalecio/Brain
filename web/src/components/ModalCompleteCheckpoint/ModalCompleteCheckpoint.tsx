import React, { useContext, useState } from 'react'
import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';
import './Modal.css'

import CheckpointsContext from '../../contexts/checkpoints';
import AuthContext from '../../contexts/auth';

import ModalMessage from '../../components/ModalMessages/ModalMessages';

interface ModalProps {
    props : {
        idCheck: number;
        title: string;
    };
    onClose: () => void;
}

const ModalCompleteCheckpoint: React.FC<ModalProps> = ({props, onClose}) => {
    const { completeCheckpoint } = useContext(CheckpointsContext);
    const { setPoints, user } = useContext(AuthContext);
    const [isModalMessageVisible, setIsModalMessageVisible] = useState(false);
    const [message, setMessage] = useState<string>('');

    async function completeCheck() {
        var reply = await completeCheckpoint(props.idCheck);
        setMessage(reply.message);
        if(reply.done === 1) {
            var currentPoints = user ? user.points : '0';
            setPoints(currentPoints as number + 20);
        }
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
                            <h5 className="modal-title" id="exampleModalLongTitle">Completar Checkpoint</h5>
                            <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h5>Tem certeza de que deseja completar o checkpoint "{props.title}"?</h5>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                            <button type="button" className="btn btn-secondary" onClick={completeCheck}>Completar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalCompleteCheckpoint
