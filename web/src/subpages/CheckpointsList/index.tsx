import React, { useEffect, useState } from 'react';
import './styles.css';
import Checkpoint from '../../components/CheckpointObject';
import Modal from '../../components/ModalCheckpoint/Modal';
import { CheckpointsData } from '../../interfaces/interfaces';

const CheckpointsList: React.FC<{checkpointsResponse: Array<CheckpointsData>}> = ({checkpointsResponse}) => {
    const [isModalVsisble, setIsModalVisible] = useState(false);
    const [screen, setScreen] = useState<Array<JSX.Element>>([
        <div style={{ padding: 50 }}>
            <h3>
                Parece que você ainda não possui checkpoints salvos :( <br/>
                Vamos lá, adicione um novo checkpoint!
            </h3>
        </div>
    ]);

    useEffect(() => {
        if(checkpointsResponse.length > 0) {
            var ativeCheckpoints = [...checkpointsResponse].filter((c) => c.status === 1);
            
            if (ativeCheckpoints.length > 0)
                setScreen(
                    ativeCheckpoints.map((oneCheckpoint) => 
                        <Checkpoint cod={oneCheckpoint.cod} codUser={oneCheckpoint.codUser} summary={oneCheckpoint.summary} limitdate={oneCheckpoint.limitdate} description={oneCheckpoint.description} />
                    )
                );
            else
                setScreen([
                    <div style={{ padding: 50 }}>
                        <h3>
                            Parece que você ainda não possui checkpoints ativos no momento :( <br/>
                            Vamos lá, adicione um novo checkpoint!
                        </h3>
                    </div>
                ]);
        }
    }, [checkpointsResponse]);

    return (
        <fieldset>
            <div className="presentation">
                <h4>Meus Checkpoints:<br/><br/></h4>
            </div>
            <button type="button" onClick={() => (setIsModalVisible(true))} className="btn btn-primary btn-lg btn-add">
                Adicionar Checkpoint<br/>
                </button>
            {isModalVsisble ? <Modal props={{id: -1, summary: '', description: '', date: ''}} onClose={() => {setIsModalVisible(false); window.location.reload();}}></Modal> : null}
            <div>
                {
                    [...screen].map((elem,  index: number)=> 
                        <div key={index}><br/>{elem}</div>
                    )
                }
                <br />
            </div>
        </fieldset>
    )
}

export default CheckpointsList;


