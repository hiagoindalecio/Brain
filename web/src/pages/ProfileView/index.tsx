import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './styles.css';

import logo from '../../assets/logo.png';
import pointsImage from '../../assets/point.png';

import SMenu from '../../components/StyledMenu';
import FriendUpdate from '../../components/FriendUpdate';

import AuthContext from '../../contexts/auth';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import ModalMessage from '../../components/ModalMessages/ModalMessages';
import { FindUsersResponse, messageResponse } from '../../interfaces/interfaces';
import ActivityContext from '../../contexts/activity';

import Beginner from '../../assets/beginner-level.png';
import Medium from '../../assets/medium-level.png';
import Master from '../../assets/master-level.png';
import MasterBlaster from '../../assets/masterblaster-level.png';

const ProfileView: React.FC = () => {
    const params = useParams<{id?: string | undefined;}>();
    const { user, findByCod } = useContext(AuthContext);
    const { getActivityByUser } = useContext(ActivityContext);
    let history = useHistory();
    const [isModalMessageVisible, setIsModalMessageVisible] = useState(false);
    const [message, setMessage] = useState<string>('');
    const [userFound, setUserFound] = useState<FindUsersResponse>();
    const [divs, setDivs] = useState<[JSX.Element]>(
        [
            <div style={{ padding: 50 }} key={'user-actJa'}>
                <h3>
                    Parece que as coisas estão meio vazias por aqui :( <br/>
                    Este usuário ainda não posssui atividades
                </h3>
            </div>
        ]
    );
    const [level, setLevel] = useState<JSX.Element>(<div />);

    useEffect(() => {
        async function getUserSelected() {
            if (params.id && !userFound) {
                try {
                    const userF = await findByCod(params.id as unknown as string);
                    if ((userF as messageResponse).message) {
                        setMessage((userF as messageResponse).message);
                        setIsModalMessageVisible(true);
                    }
                    else
                        setUserFound((userF as FindUsersResponse));
                } catch (e) {
                    setMessage(`Erro ao coletar id do usuário!\n${e}`);
                    setIsModalMessageVisible(true);
                }
            }
        }

        async function getActivity() {
            if (userFound) {
                const activities = await getActivityByUser(userFound.cod);

                if(activities.length > 0) {
                    var elements: [JSX.Element] = [<p></p>];
                    activities.forEach((acti) => {
                        elements.push(
                            <><FriendUpdate activity={acti} /><br /></>
                        )
                    })
        
                    setDivs(elements);
                } else {
                    setDivs(
                        [
                            <div style={{ padding: 50 }} key={'user-actJa'}>
                                <h3>
                                    Parece que as coisas estão meio vazias por aqui :( <br/>
                                    Este usuário ainda não posssui atividades
                                </h3>
                            </div>
                        ]
                    );
                }
            }
        }
        
        function getLevel() {
            if (userFound) {
                if(userFound?.points as number < 50) {
                    setLevel(
                        <div className="level-user">
                            <h2 className="levelText">Beginner</h2>
                            <img src={Beginner} className="img-level" alt="Beginner"/>
                        </div>
                    );
                } else if (userFound?.points as number >= 50 && userFound?.points as number < 150) {
                    setLevel(
                        <div className="level-user">
                            <h2 className="levelText">Medium</h2>
                            <img src={Medium} className="img-level" alt="Medium"/>
                        </div>
                    );
                } else if (userFound?.points as number >= 150 && userFound?.points as number < 300) {
                    setLevel(
                        <div className="level-user">
                            <h2 className="levelText">Master</h2>
                            <img src={Master} className="img-level" alt="Master"/>
                        </div>
                    );
                } else if (userFound?.points as number >= 300) {
                    setLevel(
                        <div className="level-user">
                            <h2 className="levelText">Master Blaster</h2>
                            <img src={MasterBlaster} className="img-level" alt="Master Blaster"/>
                        </div>
                    );
                }
            }
        }

        getUserSelected();
        getActivity();
        getLevel();
    }, [params, findByCod, getActivityByUser, userFound]);
    
    function back() {
        history.push("/");
    }

    return (
        <fieldset id="profile-page">
            <header className="header">
                <div className="header-logo">
                    <h1 className="header-text">Brain</h1>
                    <img src={logo} alt="Logo" className="img-logo"/>
                </div>
                {
                    user && 
                    <div className="header-information">
                        <SMenu />
                        &nbsp;&nbsp;<img src={pointsImage} alt="Score" className="img-logo"/>
                        <h4>&nbsp;{user ? user.points : '0'}</h4>
                    </div>
                }
            </header>
            {
                isModalMessageVisible ? 
                <ModalMessage props={{message}} onClose={() => {
                    setIsModalMessageVisible(false); 
                }}>
                    
                </ModalMessage> 
                : null
            }
            <ArrowBackIcon fontSize="default" className="back-button" onClick={back}/>
            <form className="form-profile">
                <div className="user-banner">
                    <div className="user-profile-picture">
                        <img src={userFound?.profile_pic} alt={userFound?.name} />
                    </div>
                    <div className="level-name">
                        <h1 className='user-name'>{userFound?.name}</h1>
                        {
                            level
                        }
                    </div>
                    <small>{userFound?.email}</small>
                </div>
                <div className="user-updates">
                    {
                        [...divs].map((elem,  index: number)=> 
                            <div key={index}>{elem}</div>
                        )
                    }
                </div>
            </form>
        </fieldset>
    )
}

export default ProfileView;