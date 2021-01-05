import React, { useEffect, useState } from 'react';

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
    // console.log(`Checkpoints recebidos:`);
    // console.log(checkpointsResponse);

    return (
        <fieldset>
            <div className="presentation">
                <h4><br/><br/> Meus Checkpoints:<br/><br/></h4>
                    <ul>
                        {
                            checkpointsResponse.map((oneCheckpoint) => (
                                console.log(oneCheckpoint.checkpoint) // descobrir pq não percorre o array com o .map
                                //Checkpoint(checkpoint.checkpoint.cod, checkpoint.checkpoint.codUser, checkpoint.checkpoint.summary, checkpoint.checkpoint.limitdate, checkpoint.checkpoint.description, checkpoint.checkpoint.tasks)
                            ))
                        }
                    </ul>
            </div>
        </fieldset>
    )
}

export default CheckpointsList;