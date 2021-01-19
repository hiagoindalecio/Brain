import React, { FormEvent, useContext, useEffect, useLayoutEffect, useState } from 'react';
import './styles.css';

import TaskContext from '../../contexts/tasks';

import Task from '../TaskObject';

import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';
import { event } from 'jquery';

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
    const [buttonText2, setButtonText2] = useState<string>('+ Abrir tasks finalizadas');
    const [checkTasks, setCheckTasks] = useState<Task[]>([]);
    const [finalizedCheckTasks, setFinalizedCheckTasks] = useState<Task[]>([]);
    const [datelimit, setDateLimit] = useState<string>('');

    useEffect(() => {
        convertData();
    }, []);

    useEffect(() => {
        if(buttonText2 === '- Fechar tasks finalizadas' && finalizedCheckTasks.length >= 1) {
            var quantos = 0;
            [...finalizedCheckTasks].map((task) => {
                if(!task.status) {
                    quantos++;
                }
            })
            if(quantos < 1) {
                setFinalizedCheckTasks([{
                    idTask: -1,
                    idCheck: -1,
                    summary: 'Não há nada para mostrar aqui :(',
                    desc: 'Você não tem tasks finalizadas para esse checkpoint.',
                    status: false
                }])
            }
        }
    }, [finalizedCheckTasks]);

    useEffect(() => {
        if(buttonText === '- Fechar tasks' && checkTasks.length >= 1) {
            var quantos = 0;
            [...checkTasks].map((task) => {
                if(!task.status) {
                    quantos++;
                }
            })
            if(quantos < 1) {
                setCheckTasks([{
                    idTask: -1,
                    idCheck: -1,
                    summary: 'Não há nada para mostrar aqui :(',
                    desc: 'Você não tem tasks para esse checkpoint.',
                    status: true
                }])
            }
        }
    }, [buttonText]);

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

    async function getFinalizedTasks(event: FormEvent) {
        event.preventDefault();
        if(buttonText2 === '+ Abrir tasks finalizadas') {
            setButtonText2('- Fechar tasks finalizadas');
            setFinalizedCheckTasks(await getTasks(cod));
        } else {
            setButtonText2('+ Abrir tasks finalizadas');
            setFinalizedCheckTasks([]);
        }
    }

    function convertData(): void {
        var converted: Array<string> = limitdate.split('-');
        converted[2] = converted[2].split('T')[0];
        var finalConversion: string = converted[2] + '/' + converted[1] + '/' + converted[0];
        setDateLimit(finalConversion);
    }

    return (
        <div className="card" key={cod}>
            <h5 className="card-header">{summary}</h5><br/>
            <button type="button" className="btn btn-primary btn-lg">Completar Checkpoint</button><br/>
            <p className="card-text">Descrição: {description}</p>
            <p className="card-text">Data limite: {datelimit}</p>
            <div className="card-body">
            <button className="btn-getTasks" onClick={getAllTasks}><h6>{buttonText}</h6></button>
                {
                    [...checkTasks].map((task, index: number) => {
                        if(task.status) {
                            return <div key={index}><br/><Task idTask={task.idTask} idCheck={cod} summary={task.summary} desc={task.desc} status={task.status} /></div>
                        }
                    })
                }
            </div>
            <div className="card-body">
            <button className="btn-getTasks" onClick={getFinalizedTasks}><h6>{buttonText2}</h6></button>
                {
                    [...finalizedCheckTasks].map((task, index: number) => {
                        if(!task.status) {
                            return <div key={index}><br/><Task idTask={task.idTask} idCheck={cod} summary={task.summary} desc={task.desc} status={task.status} /></div>
                        }
                    })
                }
            </div><br/><br/>
            <div className="btns">
                <button type="button" className="btn btn-primary btn-sm">Editar</button>
                <button type="button" className="btn btn-primary btn-sm">Adicionar Task</button>
                <button type="button" className="btn btn-primary btn-sm btn-drop">Excluir</button>
            </div>
        </div>
    );
};

export default Checkpoint;