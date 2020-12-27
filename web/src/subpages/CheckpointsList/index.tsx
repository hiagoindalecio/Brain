import React, { useContext, useEffect, useState } from 'react';

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

const CheckpointsList = (checkpointsResponse: CheckpointsData[]) => {

    return (
        <fieldset>
            <form className="presentation">
                <h4><br/><br/> Meus Checkpoints:<br/><br/></h4>
                {
                    checkpointsResponse.map(checkpoint => (
                        Checkpoint(checkpoint.checkpoint.cod, checkpoint.checkpoint.codUser, checkpoint.checkpoint.summary, checkpoint.checkpoint.limitdate, checkpoint.checkpoint.description, checkpoint.checkpoint.tasks)
                    ))
                }
            </form>
        </fieldset>
    )
}

export default CheckpointsList;