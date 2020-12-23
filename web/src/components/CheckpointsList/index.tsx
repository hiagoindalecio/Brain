import React, { useContext, useEffect, useState } from 'react';

import CheckpointsContext from '../../contexts/checkpoints';
import AuthContext from '../../contexts/auth';

import Checkpoint from '../CheckpointObject';

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

const CheckpointsList: React.FC = () => {
    const { checkpointsResponse, getCheckpoints } = useContext(CheckpointsContext);
    const { user } = useContext(AuthContext);
    const [checkpoints, setCheckpoints] = useState<CheckpointsData[]>([]);

    useEffect(() => {
        async function loadInit() {
            //await getCheckpoints(user ? user.id as number : -1);
            //setCheckpoints(checkpointsResponse);
        }
        loadInit();
    }, []);

    return (
        <fieldset>
            <form className="presentation">
                <h4><br/><br/> Meus Checkpoints:<br/><br/></h4>
                {
                    /*checkpointsResponse.map(checkpoint => (
                        Checkpoint(checkpoint.checkpoint.cod, checkpoint.checkpoint.codUser, checkpoint.checkpoint.summary, checkpoint.checkpoint.limitdate, checkpoint.checkpoint.description, checkpoint.checkpoint.tasks)
                    ))*/
                }
            </form>
        </fieldset>
    )
}

export default CheckpointsList;