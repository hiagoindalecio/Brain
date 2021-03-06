import React, { useEffect, useLayoutEffect, useState } from 'react';
import './styles.css';
import Checkpoint from '../../components/CheckpointObject';
import Modal from '../../components/ModalCheckpoint/Modal';
import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';
import { JsxEmit } from 'typescript';

interface CheckpointsData {
    cod: number,
    codUser: number,
    summary: string,
    limitdate: string,
    description: string,
    status: number
}

const CheckpointsList: React.FC<{checkpointsResponse: Array<CheckpointsData>}> = ({checkpointsResponse}) => {
    const [isModalVsisble, setIsModalVisible] = useState(false);
    const [screen, setScreen] = useState<Array<JSX.Element>>([
        <div style={{ padding: 50 }}>
            <h1>
                Parece que você ainda não possui checkpoints salvos :( <br/>
                Vamos lá, adicione um novo checkpoint!
            </h1>
        </div>
    ]);

    useLayoutEffect(() => {
        if(checkpointsResponse.length > 0) {
            setScreen(
                [...checkpointsResponse].filter((c: { status: number; }) => c.status === 1).map((oneCheckpoint: { cod: number; codUser: number; summary: string; limitdate: string; description: string; }) => 
                    <Checkpoint cod={oneCheckpoint.cod} codUser={oneCheckpoint.codUser} summary={oneCheckpoint.summary} limitdate={oneCheckpoint.limitdate} description={oneCheckpoint.description} />
                )
            );
        }
    }, []);

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
            </div>
        </fieldset>
    )
}

export default CheckpointsList;


