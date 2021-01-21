import React, { useEffect, useState } from 'react';

import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';

import Modal from '../../components/ModalTasks/ModalTasks';

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
    const [isModalVsisble, setIsModalVisible] = useState(false);

    useEffect(() => {
        if (status && summary !== 'Não há nada para mostrar aqui :(') {
            setTaskObject(
                <div key={idTask}>
                    <h5 className="card-title">●{summary}</h5>
                    <p className="card-text">Descrição: {desc}</p>
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => (setIsModalVisible(true))}>Editar</button>
                    <button type="button" className="btn btn-primary btn-sm">Concluir</button>
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
    }, []);

    return (
        isModalVsisble ? <Modal props={{summary, description: desc}} onClose={() => (setIsModalVisible(false))}></Modal> : taskObject
    );
};

export default Task;