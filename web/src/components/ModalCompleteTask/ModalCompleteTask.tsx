import React, { useContext, useState } from 'react'
import './Modal.css'

import TaskContex from '../../contexts/tasks';
import AuthContext from '../../contexts/auth';

import ModalMessage from '../../components/ModalMessages/ModalMessages';
import { ModalTaskProps } from '../../interfaces/interfaces';

const ModalCompleteCheckpoint: React.FC<ModalTaskProps> = ({props, onClose}) => {
    const { completeTask } = useContext(TaskContex);
    const { setPoints, user } = useContext(AuthContext);
    const [isModalMessageVisible, setIsModalMessageVisible] = useState(false);
    const [message, setMessage] = useState<string>('');

    async function complete() {
        var reply = await completeTask(props.idTask);
        setMessage(reply.message);
        if(reply.done === 1) {
            var currentPoints = user ? user.points : '0';
            setPoints(currentPoints as number + 10);
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
                            <h5 className="modal-title" id="exampleModalLongTitle">Completar Task</h5>
                            <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h5>Tem certeza de que deseja completar a task "{props.title}"?</h5>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                            <button type="button" className="btn btn-secondary" onClick={complete}>Completar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalCompleteCheckpoint
