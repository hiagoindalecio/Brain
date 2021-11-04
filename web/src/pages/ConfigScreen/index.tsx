import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';

import logo from '../../assets/logo.png';
import pointsImage from '../../assets/point.png';

import SMenu from '../../components/StyledMenu';
import Dropzone from '../../components/Dropzone';

import AuthContext from '../../contexts/auth';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import ModalMessage from '../../components/ModalMessages/ModalMessages';

const ConfigScreen: React.FC = () => {
    const { user, updateUser } = useContext(AuthContext);
    let history = useHistory();
    const [selectedFile, setSelectedfile] = useState<File>();
    const [btnPic, setBtnPic] = useState('Editar foto');
    const [btnName, setBtnName] = useState('Editar nome');
    const [btnPassword, setBtnPassword] = useState('Editar senha');
    const [isModalMessageVisible, setIsModalMessageVisible] = useState(false);
    const [message, setMessage] = useState<string>('');
    const [profilePic, setProfilePic] = useState<JSX.Element>(
        <div className="profPic">
            <img src={user ? user.image_url as string : ''} alt="Profile"/>
        </div>
    );
    const [secondPassword, setSecondPassword] = useState<JSX.Element>(
        <div></div>
    )
    const [inputNameDisabled, setInputNameDisabled] = useState(true);
    const [inputNameValue, setInputNameValue] = useState(user ? user.name as string : '');
    const [cancelNameVisibility, setCancelNameVisibility] = useState('hidden');
    const [cancelPicVisibility, setCancelPicVisibility] = useState('hidden');
    const [cancelPasswordVisibility, setCancelPasswordVisibility] = useState('hidden');
    const [disabledInputPassword, setDisabledInputPassword] = useState(true);
    const [inputPasswordValue, setInputPasswordValue] = useState(user ? user.password as string : '');
    const [inputPassword2Value, setInputPassword2Value] = useState(user ? user.password as string : '');
    
    function back() {
        history.push("/");
    }

    async function handleChange(actionText: String) {
        switch (actionText) {
            case 'profilePic':
                if(btnPic === 'Editar foto') {
                    setProfilePic(
                        <Dropzone onFileUploaded={setSelectedfile} />
                    )
                    setCancelPicVisibility('visible');
                    setBtnPic('Salvar foto');
                } else if(btnPic === 'Salvar foto') {
                    var result = await updateUser(user ? user.id as number : -1, null, null, selectedFile as File);
                    setProfilePic(
                        <div className="profPic">
                            <img src={user ? user.image_url as string : ''} alt="Profile"/>
                        </div>    
                    );
                    setCancelPicVisibility('hidden');
                    setBtnPic('Editar foto');
                    setMessage(result);
                    setIsModalMessageVisible(true);
                }
            break;
            case 'name':
                if(btnName === 'Editar nome') {
                    setBtnName('Salvar nome');
                    setInputNameDisabled(false);
                    setCancelNameVisibility('visible');
                } else if (btnName === 'Salvar nome') {
                    var resultUpdate = await updateUser(user ? user.id as number : -1, inputNameValue, null, null);
                    setBtnName('Editar nome');
                    setInputNameDisabled(true);
                    setCancelNameVisibility('hidden');
                    setMessage(resultUpdate);
                    setIsModalMessageVisible(true);
                }
            break;
            case 'password':
                if(btnPassword === 'Editar senha') {
                    setSecondPassword(
                        <div className="secondPassword">
                            <label htmlFor="InputPassword2">Digite sua nova senha novamente:</label>
                            <input type="password" className="form-control" id="InputPassword2" aria-describedby="emailHelp" onChange={event => setInputPassword2Value(event.target.value)} />
                            <br/>
                        </div>
                    )
                    setBtnPassword('Salvar senha');
                    setCancelPasswordVisibility('visible');
                    setDisabledInputPassword(false);
                } else if(btnPassword === "Salvar senha") {
                    if (inputPasswordValue === inputPassword2Value) {
                        var resultUpdate2 = await updateUser(user ? user.id as number : -1, null, inputPasswordValue, null);
                        if (resultUpdate2 !== null && resultUpdate2 !== undefined && resultUpdate2 !== '') {
                            setSecondPassword(
                                <div></div>
                            );
                            setCancelPasswordVisibility('hidden');
                            setDisabledInputPassword(true);
                            setBtnPassword('Editar senha');
                            setMessage(resultUpdate2);
                            setIsModalMessageVisible(true);
                        } else {
                            setMessage('Erro');
                            setIsModalMessageVisible(true);
                        }
                    } else {
                        setMessage('As senhas fornecidas não são iguais!');
                        setIsModalMessageVisible(true);
                    }
                }
            break;
        }
    }

    function cancel(whichOne: string) {
        switch (whichOne) {
            case 'profilePic':
                setProfilePic(
                    <div className="profPic">
                        <img src={user ? user.image_url as string : ''} alt="Profile"/>
                    </div>    
                );
                setCancelPicVisibility('hidden');
                setBtnPic('Editar foto');
            break;
            case 'name':
                setInputNameDisabled(true);
                setInputNameValue(user ? user.name as string : '')
                setCancelNameVisibility('hidden');
                setBtnName('Editar nome');
            break;
            case 'password':
                setSecondPassword(
                    <div></div>
                );
                setCancelPasswordVisibility('hidden');
                setDisabledInputPassword(true);
                setInputPasswordValue(user ? user.password as string : '');
                setBtnPassword('Editar senha');
            break;
        }
    }

    return (
        <fieldset id="config-page">
            <header className="header">
                <div className="header-logo">
                    <h1 className="header-text">Brain</h1>
                    <img src={logo} alt="Logo" className="img-logo"/>
                </div>
                <div className="header-information">
                    <SMenu />
                    &nbsp;&nbsp;<img src={pointsImage} alt="Score" className="img-logo"/>
                    <h4>&nbsp;{user ? user.points : '0'}</h4>
                </div>
            </header>
            {isModalMessageVisible ? <ModalMessage props={{message}} onClose={() => {
                setIsModalMessageVisible(false); 
                back();
            }}></ModalMessage> : null}
            <ArrowBackIcon fontSize="default" className="back-button" onClick={back}/>
            <form className="form-config">
                <div className="form-group">
                    <label htmlFor="">Foto de perfil:</label>
                    {profilePic}
                    <br/>
                    <div className="btns-group">
                        <button type="button" className="btn-edit btn-primary btn-lg" onClick={() => handleChange('profilePic')} >{btnPic}</button>
                        &nbsp;
                        <button type="button" id="cancelPic" className="btn-edit btn-primary btn-lg" style={{ visibility: cancelPicVisibility } as unknown as React.CSSProperties} onClick={() => cancel('profilePic')} >Cancelar</button>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="InputName">Nome:</label>
                    <input type="text" className="form-control" id="InputName" aria-describedby="emailHelp" disabled={inputNameDisabled} defaultValue={inputNameValue} onChange={event => setInputNameValue(event.target.value)} />
                    <br/>
                    <div className="btns-group">
                        <button type="button" className="btn-edit btn-primary btn-lg" onClick={() => handleChange('name')} >{btnName}</button>
                        &nbsp;
                        <button type="button" id="cancelName" className="btn-edit btn-primary btn-lg" style={{ visibility: cancelNameVisibility } as unknown as React.CSSProperties} onClick={() => cancel('name')} >Cancelar</button>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="InputPassword">Senha:</label>
                    <input type="password" className="form-control" id="InputPassword" disabled={disabledInputPassword} defaultValue={inputPasswordValue} onChange={event => setInputPasswordValue(event.target.value)} />
                    <br/>
                    {secondPassword}
                    <div className="btns-group">
                        <button type="button" className="btn-edit btn-primary btn-lg" onClick={() => handleChange('password')} >{btnPassword}</button>
                        &nbsp;
                        <button type="button" id="cancelPassword" className="btn-edit btn-primary btn-lg" style={{ visibility: cancelPasswordVisibility } as unknown as React.CSSProperties} onClick={() => cancel('password')} >Cancelar</button>
                    </div>
                </div>
            </form>
        </fieldset>

    )
}

export default ConfigScreen;