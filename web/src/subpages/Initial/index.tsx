import React from 'react';

import Ricardo from '../../assets/Ricardo.png';

import './styles.css';

const Initial: React.FC<{userName: string | null | undefined}> = ({userName}) => {
    return (
        <fieldset>
            <div className="presentation" key="initalKey">
                <h5 className="text">Olá {userName ? userName : ''}!<br/>Este é o seu espaço, aqui você tem acesso à todas as ferramentas acima. <br/>Confira acima o menu de opções interativo.<br/><br/>_Ricardo</h5>
                <img src={Ricardo} alt="Ricardo" className="avatar-img"/>
            </div>
        </fieldset>
    );
};

export default Initial;