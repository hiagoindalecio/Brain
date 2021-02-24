import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';

import logo from '../../assets/logo.png';
import pointsImage from '../../assets/point.png';

import SMenu from '../../components/StyledMenu';

import AuthContext from '../../contexts/auth';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const ConfigScreen: React.FC = () => {
    const { user } = useContext(AuthContext);
    let history = useHistory();
    
    function back() {
        history.push("/");
    }

    return (
        <fieldset id="config-page">
            <header className="header">
                <div className="header-logo">
                    <h1 className="header-text">Brain</h1>
                    <img src={logo} alt="logo" className="img-logo"/>
                </div>
                <div className="header-information">
                    <SMenu />
                    &nbsp;&nbsp;<img src={pointsImage} alt="score" className="img-logo"/>
                    <h4>&nbsp;{user ? user.points : '0'}</h4>
                </div>
            </header>
            <ArrowBackIcon fontSize="default" className="back-button" onClick={back}/>
            <form className="form-config">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Endereço de e-mail:</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Senha:</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </fieldset>
    )
}

export default ConfigScreen;