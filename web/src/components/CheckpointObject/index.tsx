import React, { FormEvent, useContext, useState } from 'react';
import './styles.css';

import TaskContext from '../../contexts/tasks';

import Task from '../TaskObject';

import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';

interface Task {
    idTask: number,
    idCheck: number,
    summary: String,
    desc: String,
    status: boolean
}

const Checkpoint: React.FC<{
    cod: number,
    codUser: number,
    summary: string,
    limitdate: string,
    description: string
}> = ({
    cod,
    codUser,
    summary,
    limitdate,
    description
}) => {
    const { getTasks } = useContext(TaskContext);

    const [buttonText, setButtonText] = useState<string>('+ Abrir tasks');
    const [checkTasks, setCheckTasks] = useState<Task[]>([]);

    async function getAllTasks(event: FormEvent) {
        event.preventDefault();
        if(buttonText === '+ Abrir tasks') {
            setButtonText('- Fechar tasks');
            setCheckTasks(await getTasks(cod));
        } else {
            setButtonText('+ Abrir tasks');
            setCheckTasks([]);
        }
    }

    return (
        <div className="card" key={cod}>
            <h5 className="card-header">{summary}</h5>
            <p className="card-text">Descrição: {description}</p>
            <p className="card-text">Data limite: {limitdate}</p>
            <div className="card-body">
            <button className="btn-getTasks" onClick={getAllTasks}>{buttonText}</button>
                {
                    [...checkTasks].map((task, index: number) => {
                        if(task.status) {
                            return <div key={index}><br/><Task idTask={task.idTask} idCheck={cod} summary={task.summary} desc={task.desc} status={task.status} /></div>
                        }
                    })
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