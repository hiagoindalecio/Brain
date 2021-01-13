import React, { useLayoutEffect, useState } from 'react';
import './styles.css';
import Checkpoint from '../../components/CheckpointObject';
import Modal from '../../components/Modal/Modal';
import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';
//import { Modal } from '../../bootstrap-4.5.3-dist/jss/bootstrap'
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
    const [isModalVsisble, setIsModalVisible] = useState(false);
    
    return (
        <fieldset>
            <div className="presentation">
                <h4>Meus Checkpoints:<br/><br/></h4>
            </div>
            <button type="button" onClick={() => (setIsModalVisible(true))} className="btn btn-primary btn-lg btn-add">
                Adicionar Checkpoint<br/>
                </button>
            {isModalVsisble ? <Modal props='a' onClose={() => (setIsModalVisible(false))}></Modal> : null}
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


