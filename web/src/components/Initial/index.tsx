import React from 'react';

import Ricardo from '../../assets/Ricardo.png';

import Checkpoint from '../Checkpoint';

interface Checkpoints {
    title: string,
    date: string
}

const Initial = (
    name: string | undefined,
    nextCheckpoints: Checkpoints[]
) => {


    return (
        <fieldset>
            <form className="apresentation">
                <h5 className="text">Olá {name}!<br/>Este é o seu espaço, aqui você tem acesso à todas as ferramentas acima. <br/>Confira abaixo seus próximos checkpoints.<br/><br/>_Ricardo</h5>
                <h4>Próximos checkpoints:</h4>
                <img src={Ricardo} alt="Ricardo" className="avatar-img"/>
                {
                    nextCheckpoints.map(checkpoint => (
                        Checkpoint(checkpoint.title, checkpoint.date, [])
                    ))
                }
            </form>
        </fieldset>
    );
};

export default Initial;