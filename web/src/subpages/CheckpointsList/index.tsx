import React, { useLayoutEffect, useState } from 'react';
import './styles.css';
import Checkpoint from '../../components/CheckpointObject';

// interface Task {
//     idTask: number,
//     idCheck: number,
//     summary: String,
//     desc: String,
//     status: boolean
// }

interface CheckpointsData {
    cod: number,
    codUser: number,
    summary: string,
    limitdate: string,
    description: string
}

const CheckpointsList: React.FC<{checkpointsResponse: Array<CheckpointsData>}> = ({checkpointsResponse}) => {
    return (
        <fieldset>
            <div className="presentation">
                <h4>Meus Checkpoints:<br/><br/></h4>
            </div>
            <button type="button" className="btn btn-primary btn-lg btn-add">Adicionar Checkpoint<br/></button>
            <div>
                {
                    [...checkpointsResponse].map((oneCheckpoint, index: number) => 
                        <div key={index}><br/><Checkpoint cod={oneCheckpoint.cod} codUser={oneCheckpoint.codUser} summary={oneCheckpoint.summary} limitdate={oneCheckpoint.limitdate} description={oneCheckpoint.description} /></div>
                    )
                }
            </div>
        </fieldset>
    )
}

export default CheckpointsList;