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
    const [btnName, setBtnName] = useState('Editar nome');
    const [btnPassword, setBtnPassword] = useState('Editar senha');
    const [profilePic, setProfilePic] = useState<JSX.Element>(
        <div className="profPic">
            <img src={user ? user.image_url as string : ''} alt="Profile picture"/>
        </div>
    );
    const [secondPassword, setSecondPassword] = useState<JSX.Element>(
        <div></div>
    )
    
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
            case 'name':
                if(btnName === 'Editar nome') {

                }
            break;
            case 'password':
                if(btnPassword === 'Editar senha') {
                    setSecondPassword(
                        <div className="secondPassword">
                            <label htmlFor="InputPassword2">Digite sua nova senha novamente:</label>
                            <input type="password" className="form-control" id="InputPassword2" aria-describedby="emailHelp" />
                            <br/>
                        </div>
                    )
                    setBtnPassword('Salvar senha');
                    $("button[type=button][id=cancelPassword]").css("visibility", "visible");
                    $("input[type=password][id=InputPassword]").css("disabled", "false");
                } else if(btnPassword === "Salvar senha") {
                    alert('Salvo com sucesso!');
                    setSecondPassword(
                        <div></div>
                    );
                    $("button[type=button][id=cancelPassword]").css("visibility", "hidden");
                    $("input[type=password][id=InputPassword]").css("disabled", "true");
                    setBtnPassword('Editar senha');
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
            case 'password':
                setSecondPassword(
                    <div></div>
                );
                $("button[type=button][id=cancelPassword]").css("visibility", "hidden");
                $("input[type=password][id=InputPassword]").css("disabled", "true");
                setBtnPassword('Editar senha');
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
                    <label htmlFor="InputName">Nome:</label>
                    <input type="text" className="form-control" id="InputName" aria-describedby="emailHelp" disabled={true} defaultValue={user ? user.name as string : ''} />
                    <br/>
                    <div className="btns-group">
                        <button type="button" className="btn-edit btn-primary btn-lg" onClick={() => handleChange('name')} >{btnName}</button>
                        &nbsp;
                        <button type="button" id="cancelName" className="btn-edit btn-primary btn-lg" style={{visibility: "hidden"} as React.CSSProperties} onClick={() => cancel('name')} >Cancelar</button>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="InputPassword">Senha:</label>
                    <input type="password" className="form-control" id="InputPassword" disabled={true} defaultValue={user ? user.password as string : ''} />
                    <br/>
                    {secondPassword}
                    <div className="btns-group">
                        <button type="button" className="btn-edit btn-primary btn-lg" onClick={() => handleChange('password')} >{btnPassword}</button>
                        &nbsp;
                        <button type="button" id="cancelPassword" className="btn-edit btn-primary btn-lg" style={{visibility: "hidden"} as React.CSSProperties} onClick={() => cancel('password')} >Cancelar</button>
                    </div>
                </div>
            </form>
        </fieldset>
    )
}

export default ConfigScreen;