import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './styles.css';

import logo from '../../assets/logo.png';
import pointsImage from '../../assets/point.png';

import SMenu from '../../components/StyledMenu';

import AuthContext from '../../contexts/auth';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import ModalMessage from '../../components/ModalMessages/ModalMessages';

const ProfileView: React.FC = () => {
    const params = useParams<{id?: string | undefined;}>();
    const { user } = useContext(AuthContext);
    let history = useHistory();
    const [isModalMessageVisible, setIsModalMessageVisible] = useState(false);
    const [message] = useState<string>('');

    useEffect(() => {
        console.log(params.id);
    }, [params]);
    
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
                <img src="" alt="" />
            </form>
        </fieldset>
    )
}

export default ProfileView;