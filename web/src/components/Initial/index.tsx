import React from 'react';

import Ricardo from '../../assets/Ricardo.png';

import Checkpoint from '../Checkpoint';

interface Checkpoints {
    cod: number,
    codUser: number,
    summary: string,
    limitdate: string,
    description: string,
    tasks: Task[];
}

interface Task {
    task: {
        idTask: number,
        idCheck: number,
        summary: String,
        desc: String,
        status: boolean
    }
}

const Initial = (
    name: string | undefined,
    nextCheckpoints: Checkpoints[]
) => {
    return (
        <fieldset>
            <form className="apresentation">
                <h5 className="text">Olá {name}!<br/>Este é o seu espaço, aqui você tem acesso à todas as ferramentas acima. <br/>Confira abaixo seus próximos checkpoints.<br/><br/>_Ricardo</h5>
                <h4>Próximos checkpoints:</h4>
                <img src={Ricardo} alt="Ricardo" className="avatar-img"/>
                {
                    nextCheckpoints.map(checkpoint => (
                        Checkpoint(checkpoint.cod, checkpoint.codUser, checkpoint.summary, checkpoint.limitdate, checkpoint.description, checkpoint.tasks)
                    ))
                }
            </form>
        </fieldset>
    );
};

export default Initial;