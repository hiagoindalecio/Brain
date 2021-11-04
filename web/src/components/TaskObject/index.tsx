import React, { useEffect, useState } from 'react';

import Modal from '../../components/ModalTasks/ModalTasks';
import ModalComplete from '../../components/ModalCompleteTask/ModalCompleteTask';

const Task: React.FC<{
    idTask: number,
    idCheck: number,
    summary: string,
    desc: string,
    status: boolean
}> = ({
    idTask,
    idCheck,
    summary,
    desc,
    status
}) => {
    const [taskObject, setTaskObject] = useState<JSX.Element>(<div />);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalCompleteVisible, setIsModalCompleteVisible] = useState(false);

    useEffect(() => {
        if (status && summary !== 'Não há nada para mostrar aqui :(') {
            setTaskObject(
                <div key={idTask}>
                    <h5 className="card-title">●{summary}</h5>
                    <p className="card-text">Descrição: {desc}</p>
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => (setIsModalVisible(true))}>Editar</button>
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => {setIsModalCompleteVisible(true)}}>Concluir</button>
                    
                </div>
            )
        } else if (!status || summary === 'Não há nada para mostrar aqui :(') {
            setTaskObject(
                <div key={idTask}>
                    <h5 className="card-title">●{summary}</h5>
                    <p className="card-text">Descrição: {desc}</p>
                </div>
            )
        }
    }, [desc, idTask, status, summary]);

    return (
        isModalVisible ? <Modal props={{id: idTask, idCheck, summary, description: desc}} onClose={() => {setIsModalVisible(false); window.location.reload();}}></Modal> : (isModalCompleteVisible ? <ModalComplete props={{idTask, title: summary}} onClose={() => {setIsModalCompleteVisible(false); window.location.reload();}}></ModalComplete> : taskObject)
    );
};

export default Task;