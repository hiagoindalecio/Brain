import React, { useContext, useLayoutEffect, useState } from 'react';

import Ricardo from '../../assets/Ricardo.png';
import Beginner from '../../assets/beginner-level.png';
import Medium from '../../assets/medium-level.png';
import Master from '../../assets/master-level.png';
import MasterBlaster from '../../assets/masterblaster-level.png';

//import ModalFriendsList from '../../components/FriendsList/index';

//import FriendsContex from '../../contexts/friends';
import AuthContext from '../../contexts/auth';

import './styles.css';

const Initial: React.FC = () => {
    const { user } = useContext(AuthContext);
    const [level, setLevel] = useState<JSX.Element>(<div />);
    const [friendsComponent] = useState<JSX.Element>();
    //const { getFriends } = useContext(FriendsContex);
    const pointsUser = user ? user.points as number : 0;
    
    useLayoutEffect(() => {
        if(pointsUser as number < 50) {
            setLevel(
                <div className="level-user">
                    <h2 className="levelText">Beginner</h2>
                    <img src={Beginner} className="img-level" alt="Beginner"/>
                </div>
            );
        } else if (pointsUser as number >= 50 && pointsUser as number < 150) {
            setLevel(
                <div className="level-user">
                    <h2 className="levelText">Medium</h2>
                    <img src={Medium} className="img-level" alt="Medium"/>
                </div>
            );
        } else if (pointsUser as number >= 150 && pointsUser as number < 300) {
            setLevel(
                <div className="level-user">
                    <h2 className="levelText">Master</h2>
                    <img src={Master} className="img-level" alt="Master"/>
                </div>
            );
        } else if (pointsUser as number >= 300) {
            setLevel(
                <div className="level-user">
                    <h2 className="levelText">Master Blaster</h2>
                    <img src={MasterBlaster} className="img-level" alt="Master Blaster"/>
                </div>
            );
        }

        /*async function findFriends() { LISTA DE AMIGOS DESATIVADA
            setFriendsComponent(<div></div>)
            setFriendsComponent(<ModalFriendsList friends={await getFriends(user ? user.id as number : -1)}></ModalFriendsList>);
        }

        findFriends();
        setInterval(async () => {findFriends()}, 10000);*/
    }, [pointsUser]);
    
    return (
        <fieldset>
            <div className="presentation" key="initalKey">
            <img src={Ricardo} alt="Ricardo" className="avatar-img"/>
                <div className="text">
                    <h5>Olá {user ? user.name : ''}!<br/>Este é o seu espaço, aqui você tem acesso à todas as ferramentas acima. <br/>Confira acima o menu de opções interativo.<br/><br/>_Ricardo<br/><br/><br/><br/></h5>
                    <div className="level-field">
                        <h4>Seu nível é: <br/><br/></h4>
                        {
                            level
                        }
                        <h6><br/><br/>Conquiste mais pontos e suba de nível!</h6>
                    </div>
                </div>
                {
                    friendsComponent
                }
            </div>
        </fieldset>
    );
};

export default Initial;