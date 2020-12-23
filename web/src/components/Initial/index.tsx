import React, { useEffect, useState, useContext } from 'react';

import Ricardo from '../../assets/Ricardo.png';

import Checkpoint from '../CheckpointObject';

import CheckpointsContext from '../../contexts/checkpoints';
import AuthContext from '../../contexts/auth';

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

const Initial: React.FC = () => {
    const { user } = useContext(AuthContext);
    const { checkpointsResponse, getThreeNextCheckpoints } = useContext(CheckpointsContext);
    const [checkpoints, setCheckpoints] = useState<CheckpointsData[] | null>(null);

    /*useEffect(() => {
        async function loadInit() {
            await getCheckpoints(user ? user.id as number : -1);
            setCheckpoints(checkpointsResponse);
        }
        loadInit();
    }, []);*/
    
    async function handleCheckpoints() {
        await getThreeNextCheckpoints(user ? user.id as number : -1);
    }

    return (
        <fieldset>
            <form className="apresentation">
                <h5 className="text">Olá {user ? user.name : ''}!<br/>Este é o seu espaço, aqui você tem acesso à todas as ferramentas acima. <br/>Confira abaixo seus próximos checkpoints.<br/><br/>_Ricardo</h5>
                <h4 onClick={handleCheckpoints}>Próximos checkpoints:</h4>
                <img src={Ricardo} alt="Ricardo" className="avatar-img"/>
                {
                    // checkpoints.map(checkpoint => (
                    //     Checkpoint(checkpoint.checkpoint.cod, checkpoint.checkpoint.codUser, checkpoint.checkpoint.summary, checkpoint.checkpoint.limitdate, checkpoint.checkpoint.description, checkpoint.checkpoint.tasks)
                    // ))
                }
            </form>
        </fieldset>
    );
};

export default Initial;