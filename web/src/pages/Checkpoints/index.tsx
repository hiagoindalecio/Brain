import React, { useContext } from 'react';

import Checkpoint from '../../components/CheckpointObject';

import AuthContext from '../../contexts/auth';

interface Checkpoint {
    title: string,
    date: string
}

const Checkpoints = (userCheckpoints: Checkpoint[]) => {
    const { user } = useContext(AuthContext);

    return (
        <fieldset>
            <form action="" className="checkpoints">
                <h1>Checkpoints:</h1>
                <br/>
                <p>Checkpoints de {user?.name}</p>
                {
                    //nextCheckpoints.map(checkpoint => (
                    //    Checkpoint(checkpoint.title, checkpoint.date, [])
                    //))
                }
            </form>
        </fieldset>
    )
}