import React, { useLayoutEffect, useState } from 'react';

import Ricardo from '../../assets/Ricardo.png';
import Beginner from '../../assets/beginner-level.png';
import Medium from '../../assets/medium-level.png';
import Master from '../../assets/master-level.png';
import MasterBlaster from '../../assets/masterblaster-level.png';

import './styles.css';

const Initial: React.FC<{userName: string | null | undefined, pointsUser: number | null | undefined}> = ({userName, pointsUser}) => {
    const [level, setLevel] = useState<JSX.Element>(<div />);
    
    useLayoutEffect(() => {
        if(pointsUser as number < 50) {
            setLevel(
                <div className="level-user">
                    <h2 className="levelText">Beginner</h2>
                    <img src={Beginner} className="img-level" alt="Beginner image."/>
                </div>
            );
        } else if (pointsUser as number >= 50 && pointsUser as number < 150) {
            setLevel(
                <div className="level-user">
                    <h2 className="levelText">Medium</h2>
                    <img src={Medium} className="img-level" alt="Medium image."/>
                </div>
            );
        } else if (pointsUser as number >= 150 && pointsUser as number < 300) {
            setLevel(
                <div className="level-user">
                    <h2 className="levelText">Master</h2>
                    <img src={Master} className="img-level" alt="Master image."/>
                </div>
            );
        } else if (pointsUser as number >= 300) {
            setLevel(
                <div className="level-user">
                    <h2 className="levelText">Master Blaster</h2>
                    <img src={MasterBlaster} className="img-level" alt="Master Blaster image."/>
                </div>
            );
        }
    }, []);
    
    return (
        <fieldset>
            <div className="presentation" key="initalKey">
            <img src={Ricardo} alt="Ricardo" className="avatar-img"/>
                <div className="text">
                    <h5>Olá {userName ? userName : ''}!<br/>Este é o seu espaço, aqui você tem acesso à todas as ferramentas acima. <br/>Confira acima o menu de opções interativo.<br/><br/>_Ricardo<br/><br/><br/><br/></h5>
                    <div className="level-field">
                        <h4>Seu nível é: <br/><br/></h4>
                        {
                            level
                        }
                        <h6><br/><br/>Conquiste mais pontos e suba de nível!</h6>
                    </div>
                </div>
            </div>
        </fieldset>
    );
};

export default Initial;