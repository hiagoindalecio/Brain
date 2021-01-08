import React, { useLayoutEffect, useState } from 'react';

import Checkpoint from '../../components/CheckpointObject';

interface Task {
    idTask: number,
    idCheck: number,
    summary: String,
    desc: String,
    status: boolean
}

interface CheckpointsData {
    cod: number,
    codUser: number,
    summary: string,
    limitdate: string,
    description: string,
    tasks: Task[];
}

const CheckpointsList: React.FC<{checkpointsResponse: Array<CheckpointsData>}> = ({checkpointsResponse}) => {
    useLayoutEffect(() => {
        console.log(`Checkpoints recebidos(dentro do useEffect):`);
        console.log(checkpointsResponse);
        console.log(checkpointsResponse[0]);
        var b = checkpointsResponse.length;
        console.log(`Tamanho: ${b}`);
        for (var i = 0; i < b; i++) {
            console.log(checkpointsResponse[i]);
        }
    }, []);
    // <div key={index}><Checkpoint cod={oneCheckpoint.checkpoint.cod} codUser={oneCheckpoint.checkpoint.codUser} summary={oneCheckpoint.checkpoint.summary} limitdate={oneCheckpoint.checkpoint.limitdate} description={oneCheckpoint.checkpoint.description} tasks={oneCheckpoint.checkpoint.tasks} /></div>
    return (
        <fieldset>
            <div className="presentation">
                <h4><br/><br/>Meus Checkpoints:<br/><br/></h4>
            </div>
            <div>
                {
                    checkpointsResponse.map((oneCheckpoint, index: number) => 
                        <div key={index}><Checkpoint cod={oneCheckpoint.cod} codUser={oneCheckpoint.codUser} summary={oneCheckpoint.summary} limitdate={oneCheckpoint.limitdate} description={oneCheckpoint.description} tasks={oneCheckpoint.tasks} /></div>
                    )
                }
            </div>
        </fieldset>
    )
}

export default CheckpointsList;