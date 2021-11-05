import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './styles.css';

import logo from '../../assets/logo.png';
import pointsImage from '../../assets/point.png';

import SMenu from '../../components/StyledMenu';

import AuthContext from '../../contexts/auth';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import ModalMessage from '../../components/ModalMessages/ModalMessages';
import { FindUsersResponse, messageResponse } from '../../interfaces/interfaces';

const ProfileView: React.FC = () => {
    const params = useParams<{id?: string | undefined;}>();
    const { user, findByCod } = useContext(AuthContext);
    let history = useHistory();
    const [isModalMessageVisible, setIsModalMessageVisible] = useState(false);
    const [message, setMessage] = useState<string>('');
    const [userFound, setUserFound] = useState<FindUsersResponse>();

    useEffect(() => {
        async function getUserSelected() {
            if (params.id) {
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
        
        getUserSelected();
    }, [params, findByCod]);
    
    function back() {
        history.push("/");
    }

    return (
        <fieldset id="config-page">
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
                    <h1>{userFound?.name}</h1>
                    <small>{userFound?.email}</small>
                </div>
                
            </form>
        </fieldset>
    )
}

export default ProfileView;