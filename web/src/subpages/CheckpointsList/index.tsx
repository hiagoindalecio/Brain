import React, { useEffect, useLayoutEffect, useState } from 'react';

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

const CheckpointsList: React.FC<{checkpointsResponse: CheckpointsData[]}> = ({checkpointsResponse}) => {
    const [valor, setValor] = useState<CheckpointsData[]>(checkpointsResponse);

    useEffect(() => {
        setValor([...checkpointsResponse]);
    }, []);
    /*useEffect(() => {
        console.log(`Checkpoints recebidos(dentro do useEffect):`);
        console.log(checkpointsResponse);
    }, []);
    useLayoutEffect(() => {
        console.log(`Checkpoints recebidos:(dentro do useLayoutEffect)`);
        console.log(checkpointsResponse);
    }, []);*/
    // <div key={index}><Checkpoint cod={oneCheckpoint.checkpoint.cod} codUser={oneCheckpoint.checkpoint.codUser} summary={oneCheckpoint.checkpoint.summary} limitdate={oneCheckpoint.checkpoint.limitdate} description={oneCheckpoint.checkpoint.description} tasks={oneCheckpoint.checkpoint.tasks} /></div>
    return (
        <fieldset>
            <div className="presentation">
                <h4><br/><br/> Meus Checkpoints:<br/><br/></h4>
                    <ul>
                        {
                            valor.map((oneCheckpoint: CheckpointsData, index: number) => 
                                <div key={index}><Checkpoint cod={oneCheckpoint.checkpoint.cod} codUser={oneCheckpoint.checkpoint.codUser} summary={oneCheckpoint.checkpoint.summary} limitdate={oneCheckpoint.checkpoint.limitdate} description={oneCheckpoint.checkpoint.description} tasks={oneCheckpoint.checkpoint.tasks} /></div>
                            )
                        }
                    </ul>
            </div>
        </fieldset>
    )
}

export default CheckpointsList;