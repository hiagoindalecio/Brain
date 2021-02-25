import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';

import $ from "jquery";

import logo from '../../assets/logo.png';
import pointsImage from '../../assets/point.png';

import SMenu from '../../components/StyledMenu';
import Dropzone from '../../components/Dropzone';

import AuthContext from '../../contexts/auth';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const ConfigScreen: React.FC = () => {
    const { user } = useContext(AuthContext);
    let history = useHistory();
    const [selectedFile, setSelectedfile] = useState<File>();
    const [btnPic, setBtnPic] = useState('Editar foto');
    const [profilePic, setProfilePic] = useState<JSX.Element>(
        <div className="profPic">
            <img src={user ? user.image_url as string : ''} alt="Profile picture"/>
        </div>
    );
    
    function back() {
        history.push("/");
    }

    function handleChange(actionText: String) {
        switch (actionText) {
            case 'profilePic':
                if(btnPic === 'Editar foto') {
                    setProfilePic(
                        <Dropzone onFileUploaded={setSelectedfile} />
                    )
                    $("button[type=button][id=cancelPic]").css("visibility", "visible");
                    setBtnPic('Salvar foto');

                } else if(btnPic === 'Salvar foto') {
                    alert('Salvo com sucesso!');
                    setProfilePic(
                        <div className="profPic">
                            <img src={user ? user.image_url as string : ''} alt="Profile picture"/>
                        </div>    
                    );
                    $("button[type=button][id=cancelPic]").css("visibility", "hidden");
                    setBtnPic('Editar foto');
                }
            break;
        }
    }

    function cancel(whichOne: string) {
        switch (whichOne) {
            case 'profilePic':
                setProfilePic(
                    <div className="profPic">
                        <img src={user ? user.image_url as string : ''} alt="Profile picture"/>
                    </div>    
                );
                $("button[type=button][id=cancelPic]").css("visibility", "hidden");
                setBtnPic('Editar foto');
            break;
        }
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
                    <label htmlFor="">Foto de perfil:</label>
                    {profilePic}
                    <br/>
                    <div className="btns-group">
                        <button type="button" className="btn-edit btn-primary btn-lg" onClick={() => handleChange('profilePic')} >{btnPic}</button>
                        &nbsp;
                        <button type="button" id="cancelPic" className="btn-edit btn-primary btn-lg" style={{visibility: "hidden"} as React.CSSProperties} onClick={() => cancel('profilePic')} >Cancelar</button>
                    </div>         
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Endereço de e-mail:</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" disabled={true} defaultValue={user ? user.email as string : ''} />
                    <br/>
                    <button type="button" className="btn-edit btn-primary btn-lg" >Editar e-mail</button>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Senha:</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" disabled={true} defaultValue={user ? user.password as string : ''} />
                    <br/>
                    <button type="button" className="btn-edit btn-primary btn-lg" >Editar senha</button>
                </div>
            </form>
        </fieldset>
    )
}

export default ConfigScreen;