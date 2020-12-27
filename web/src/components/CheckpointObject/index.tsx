import React from 'react';
import './styles.css';

import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';

interface Task {
    task: {
        idTask: number,
        idCheck: number,
        summary: String,
        desc: String,
        status: boolean
    }
}

const Checkpoint = (
    cod: number,
    codUser: number,
    summary: string,
    limitdate: string,
    description: string,
    tasks: Task[]
) => {


    return (
        <div className="card" key={cod}>
            <h5 className="card-header">{summary}</h5>
            <p className="card-text">Descrição: {description}</p>
            <p className="card-text">Data limite: {limitdate}</p>
            <div className="card-body">
                {
                    tasks.map(task => {if(task.task.summary !== 'Vazio') {
                        (
                            <React.Fragment>
                                <h5 className="card-title">●{task.task.summary}</h5>
                                <p className="card-text">Descrição: {task.task.desc}</p>
                                <button type="button" className="btn btn-primary btn-sm">Editar</button>
                            </React.Fragment>
                        )
                    }})
                }
            </div>
            <div className="btns">
                <button type="button" className="btn btn-primary btn-sm">Editar</button>
                <button type="button" className="btn btn-primary btn-sm btn-drop">Excluir</button>
            </div>
        </div>
    );
};

export default Checkpoint;