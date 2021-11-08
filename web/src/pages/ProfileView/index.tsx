import React, { useState, useContext, useEffect, FormEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import './styles.css';

import SMenu from '../../components/StyledMenu';
import FriendUpdate from '../../components/FriendUpdate';
import ModalMessage from '../../components/ModalMessages/ModalMessages';

import AuthContext from '../../contexts/auth';
import ActivityContext from '../../contexts/activity';
import FriendsContext from '../../contexts/friends';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';

import { FindUsersResponse, messageResponse } from '../../interfaces/interfaces';

import logo from '../../assets/logo.png';
import pointsImage from '../../assets/point.png';
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
                    {
                        user?.id as unknown as string !== userFound?.cod ?
                        'Este usuário ainda não posssui atividades'
                        :
                        'Você ainda não possui atividades'
                    }
                </h3>
            </div>
        ]
    );
    const [level, setLevel] = useState<JSX.Element>(<div />);
    const { getFriendship, addNewFriend, getFriendshipRequest, cancelFriendRequest, declineFriendRequest, acceptFriendRequest, endFriendship } = useContext(FriendsContext);
    const [isFriend, setIsfriend] = useState(false);
    const [isFriendPending, setIsfriendPending] = useState(false);
    const [isOptionVisible, setIsOptionVisible] = useState(false);
    const [isAcceptFriendPending, setIsAcceptfriendPending] = useState(false);

    useEffect(() => {
        setIsfriend(false);
        setIsfriendPending(false);
        setIsAcceptfriendPending(false);
        
        async function getUserSelected() { // Pega o usuário
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

        async function getActivity() { // Pega a atividade do usuário
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
                                        {
                                            user?.id as unknown as string !== userFound?.cod ?
                                            'Este usuário ainda não posssui atividades'
                                            :
                                            'Você ainda não possui atividades'
                                        }
                                </h3>
                            </div>
                        ]
                    );
                }
            }
        }
        
        function getLevel() { // Pega o level do usuário
            if (userFound) {
                if(userFound?.points as number < 50) {
                    setLevel(
                        <div className="level-userProfile">
                            <h2 className="levelText">Beginner</h2>
                            <img src={Beginner} className="img-level" alt="Beginner"/>
                        </div>
                    );
                } else if (userFound?.points as number >= 50 && userFound?.points as number < 150) {
                    setLevel(
                        <div className="level-userProfile">
                            <h2 className="levelText">Medium</h2>
                            <img src={Medium} className="img-level" alt="Medium"/>
                        </div>
                    );
                } else if (userFound?.points as number >= 150 && userFound?.points as number < 300) {
                    setLevel(
                        <div className="level-userProfile">
                            <h2 className="levelText">Master</h2>
                            <img src={Master} className="img-level" alt="Master"/>
                        </div>
                    );
                } else if (userFound?.points as number >= 300) {
                    setLevel(
                        <div className="level-userProfile">
                            <h2 className="levelText">Master Blaster</h2>
                            <img src={MasterBlaster} className="img-level" alt="Master Blaster"/>
                        </div>
                    );
                }
            }
        }

        async function getIsFriend() { // Verifica se é amigo
            if(user && userFound && user.id !== userFound.cod as unknown as number) {
                var friendship = await getFriendship(user.id as unknown as number, userFound.cod as unknown as number);
                if (friendship.cod_friend === -1)
                    setIsfriend(false);
                else {
                    if (friendship.accepted)
                        setIsfriend(true);
                    else {
                        setIsfriend(false);
                        setIsfriendPending(true);
                    }
                }
            }
        }

        async function getIsThereAFriendRequest() { // Verifica se está requisitando amizade
            if(user && userFound && user.id !== userFound.cod as unknown as number) {
                var friendship = await getFriendshipRequest(user.id as unknown as string, userFound.cod as unknown as string);
                if (friendship.cod_friend === -1)
                    setIsAcceptfriendPending(false);
                else {
                    if (!friendship.accepted)
                        setIsAcceptfriendPending(true);
                    else
                        setIsAcceptfriendPending(false);
                }
            }
        }

        getUserSelected();
        getActivity();
        getLevel();
        getIsFriend();
        getIsThereAFriendRequest();
    }, [params, findByCod, getActivityByUser, userFound, getFriendship, user, getFriendshipRequest, isModalMessageVisible]);
    
    function back() {
        history.push("/");
    }

    async function handleAddFriend(event: FormEvent) {
        event.preventDefault();
        const result = await addNewFriend(user?.id as unknown as string, userFound?.cod as unknown as string);
        setMessage(result.message);
        setIsModalMessageVisible(true);
    }

    async function handleCancelFriendRequest(event: FormEvent) {
        event.preventDefault();
        const result = await cancelFriendRequest(user?.id as unknown as string, userFound?.cod as unknown as string);
        setMessage(result.message);
        setIsModalMessageVisible(true);
    }

    async function handleDeclineFriendRequest(event: FormEvent) {
        event.preventDefault();
        const result = await declineFriendRequest(user?.id as unknown as string, userFound?.cod as unknown as string);
        setMessage(result.message);
        setIsModalMessageVisible(true);
    }

    async function handleAcceptFriendRequest(event: FormEvent) {
        event.preventDefault();
        const result = await acceptFriendRequest(user?.id as unknown as string, userFound?.cod as unknown as string);
        setMessage(result.message);
        setIsModalMessageVisible(true);
    }

    async function handleEndFriendship(event: FormEvent) {
        event.preventDefault();
        const result = await endFriendship(user?.id as unknown as string, userFound?.cod as unknown as string);
        setMessage(result.message);
        setIsModalMessageVisible(true);
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
                    {
                        userFound && user && user.id !== userFound.cod as unknown as number ? // Se tiver user logado, encontrou o user selecionado e não é o próprio user logado
                            !isFriend && !isFriendPending && !isAcceptFriendPending ? // caso não seja amigo e em teha pedido pendente
                                <>
                                    <br />
                                    <button className="add-friend btn btn-primary btn-sm" onClick={(event) => handleAddFriend(event)}>
                                        Adicionar amigo
                                    </button>
                                </>
                            :
                                isFriendPending ? // caso tenha um pedido de amizade pendente 
                                    <>
                                        <br />
                                        <small className='friendship-explanation'>Pedido de amizade pendente</small>
                                        <br />
                                        <div className="options">
                                            <div className='more-button' >
                                                    <small>Opções</small>
                                                    <ArrowDownwardRoundedIcon fontSize='small' className={isOptionVisible ? 'notVisible' : 'visible'} onClick={() => setIsOptionVisible(true)} />
                                                    <ArrowUpwardRoundedIcon fontSize='small' className={`close-options-button ${isOptionVisible ? 'visible' : 'notVisible'}`} onClick={() => setIsOptionVisible(false)} />
                                            </div>
                                            <button className={`cancel-friend btn btn-primary btn-sm btn-drop ${isOptionVisible ? 'visible' : 'notVisible'}`} onClick={(event) => handleCancelFriendRequest(event)} >
                                                Cancelar pedido de amizade
                                            </button>
                                        </div>
                                    </>
                                : 
                                    isAcceptFriendPending ? // Caso tenha uma slicitaçã pendente
                                        <>
                                            <br />
                                            <small className='friendship-explanation' >Solicitação pedente</small>
                                            <br />
                                            <button className="add-friend btn btn-primary btn-sm" onClick={(event) => handleAcceptFriendRequest(event)}>
                                                Aceitar solicitação
                                            </button>
                                            <button className="add-friend btn btn-primary btn-sm btn-drop" onClick={(event) => handleDeclineFriendRequest(event)}>
                                                Rejeitar solicitação
                                            </button>
                                        </>
                                    : // caso seja amigos e não seja o próprio usuário 
                                        <>
                                            <br />
                                            <small className='friendship-explanation' >Amigos</small>
                                            <br />
                                            <div className="options">
                                                <div className='more-button' >
                                                    <small>Opções</small>
                                                    <ArrowDownwardRoundedIcon fontSize='small' className={isOptionVisible ? 'notVisible' : 'visible'} onClick={() => setIsOptionVisible(true)} />
                                                    <ArrowUpwardRoundedIcon fontSize='small' className={`close-options-button ${isOptionVisible ? 'visible' : 'notVisible'}`} onClick={() => setIsOptionVisible(false)} />
                                                </div>
                                                <button className={`cancel-friend btn btn-primary btn-sm btn-drop ${isOptionVisible ? 'visible' : 'notVisible'}`} onClick={(event) => handleEndFriendship(event)} >
                                                    Cancelar amizade
                                                </button>
                                            </div>
                                        </>
                        : 
                        <>
                        </>
                    }
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