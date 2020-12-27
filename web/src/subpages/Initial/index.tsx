import React, { useContext } from 'react';

import Ricardo from '../../assets/Ricardo.png';

import Checkpoint from '../../components/CheckpointObject';

interface Task {
    task: {
        idTask: number,
        idCheck: number,
        summary: String,
        desc: String,
        status: boolean
    }
}

interface CheckpointsData {
    checkpoint: {
        cod: number,
        codUser: number,
        summary: string,
        limitdate: string,
        description: string,
        tasks: Task[];
    }
}

const Initial = (checkpointsResponse: CheckpointsData[], userName: string | null | undefined) => {
    console.log('Checkpoints recebidos na tela inicial: ');
    console.log(checkpointsResponse);
    return (
        <fieldset>
            <div className="apresentation" key="initalKey">
                <h5 className="text">Olá {userName ? userName : ''}!<br/>Este é o seu espaço, aqui você tem acesso à todas as ferramentas acima. <br/>Confira abaixo seus próximos checkpoints.<br/><br/>_Ricardo</h5>
                <h4>Próximos checkpoints:</h4>
                <img src={Ricardo} alt="Ricardo" className="avatar-img"/>
                <div className="checkpoints">
                {
                    checkpointsResponse.map(checkpoint => (
                        Checkpoint(checkpoint.checkpoint.cod, checkpoint.checkpoint.codUser, checkpoint.checkpoint.summary, checkpoint.checkpoint.limitdate, checkpoint.checkpoint.description, checkpoint.checkpoint.tasks)
                    ))
                }
                </div>
            </div>
        </fieldset>
    );
};

export default Initial;