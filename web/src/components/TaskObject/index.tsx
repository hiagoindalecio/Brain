import React from 'react';

import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';

const Task: React.FC<{
    idTask: number,
    idCheck: number,
    summary: String,
    desc: String,
    status: boolean
}> = ({
    idTask,
    idCheck,
    summary,
    desc,
    status
}) => {
    return (
        <div key={idTask}>
            <h5 className="card-title">●{summary}</h5>
            <p className="card-text">Descrição: {desc}</p>
            <button type="button" className="btn btn-primary btn-sm">Editar</button>
            <button type="button" className="btn btn-primary btn-sm">Concluir</button>
        </div>
    );
};

export default Task;