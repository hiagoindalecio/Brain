import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
import './styles.css';
import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';
import $ from "jquery";

import AuthContext from '../../contexts/auth';

import ModalMessage from '../../components/ModalMessages/ModalMessages';

import logo from '../../assets/logo.png'

const Login: React.FC = () => {
    const { singIn, createUser } = useContext(AuthContext);
    const [secondEmail, setSecondEmail] = useState<JSX.Element>();
    const [secondPassword, setSecondPassword] = useState<JSX.Element>();
    const [nameUser, setNameUser] = useState<JSX.Element>();
    const [action, setAction] = useState<String>('Entrar');
    const [isModalMessageVisible, setIsModalMessageVisible] = useState(false);
    const [message, setMessage] = useState<string>('');

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if($("input[type=email][name=email]").val() as string !== '' && $("input[type=password][name=password]").val() as string !== '') {
            if(action === 'Entrar') {
                var done = await singIn($("input[type=email][name=email]").val() as string, ($("input[type=password][name=password]").val() as string));
                if(done !== 'Sucesso!') {
                    alert(done.toString());
                }
                //setIsModalMessageVisible(true);
            } else if (action === 'Criar conta') {
                if(($("input[type=email][name=email]").val() as string) === ($("input[type=email][name=email2]").val() as string) && ($("input[type=password][name=password]").val() as string) === ($("input[type=password][name=password2]").val() as string) && ($("input[type=text][name=nameUser]").val() as string) !== '') {
                    const reply = await createUser(($("input[type=email][name=email]").val() as string), ($("input[type=password][name=password]").val() as string), ($("input[type=text][name=nameUser]").val() as string));
                    setMessage(reply.toString());
                    setIsModalMessageVisible(true);
                } else if (($("input[type=email][name=email]").val() as string) !== ($("input[type=email][name=email2]").val() as string)) {
                    setMessage('Os dois endereços de e-mail devem ser indênticos!');
                    setIsModalMessageVisible(true);
                } else if (($("input[type=password][name=password]").val() as string) !== ($("input[type=password][name=password2]").val() as string)) {
                    setMessage('Os dois campos de senha devem ser idênticos!');
                    setIsModalMessageVisible(true);
                } else if (($("input[type=text][name=nameUser]").val() as string) === '') {
                    setMessage('Você deve preencher o campo de nome!');
                    setIsModalMessageVisible(true);
                }
            }
        } else {
            setMessage('Os campos e-mail e senha devem estar preenchidos!');
            setIsModalMessageVisible(true);
        }
    };

    function handleChange(actionText: String) {
        if(actionText === 'option1') {
            setAction('Entrar');
            setSecondEmail(<div />);
            setSecondPassword(<div />);
            setNameUser(<div />);
        } else if (actionText === 'option2') {
            setAction('Criar conta');
            setSecondEmail(
                <div className="form-group">
                    <label htmlFor="InputEmail2">Confime seu e-mail:</label>
                    <input type="email" name="email2" className="form-control" id="InputEmail2" aria-describedby="emailHelp" />
                </div>
            );
            setSecondPassword(
                <div className="form-group">
                    <label htmlFor="InputPassword2">Confime sua senha:</label>
                    <input type="password" name="password2" className="form-control" id="InputPassword2" />
                </div>
            )
            setNameUser(
                <div className="form-group">
                    <label htmlFor="InputName">Informe seu nome:</label>
                    <input type="text" name="nameUser" className="form-control" id="InputName" />
                </div>
            )
        }
    }

    return(
        <fieldset>
            <div id="login-page">
                <div className="content">
                {isModalMessageVisible ? <ModalMessage props={{message}} onClose={() => {setIsModalMessageVisible(false);}}></ModalMessage> : null}
                    <header className="header">
                        <div className="header-logo">
                            <h1 className="header-text">Brain</h1>
                            <img src={logo} alt="logo" className="img-logo"/>
                        </div>
                    </header>
                    <form className="form-login" onSubmit={handleSubmit}>
                        {
                            nameUser
                        }
                        <div className="form-group">
                            <label htmlFor="InputEmail1">Endereço de e-mail</label>
                            <input type="email" name="email" className="form-control" id="InputEmail1" aria-describedby="emailHelp" />
                            <small id="emailHelp" className="form-text text-muted">Nós nunca iremos compartilhar seu e-mail com ninguém.</small>
                        </div>
                        {
                            secondEmail
                        }
                        <div className="form-group">
                            <label htmlFor="InputPassword1">Senha</label>
                            <input type="password" name="password" className="form-control" id="InputPassword1" />
                        </div>
                        {
                            secondPassword
                        }
                        <button type="submit" className="btn btn-primary">{action}</button>
                        <nav className="navbar-light bg-light">
                                <button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => handleChange('option1')}>Tenho um conta</button>
                                <button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => handleChange('option2')}>Não tenho uma conta</button>
                        </nav>
                    </form>
                </div>
            </div>
        </fieldset>
        
    );
}

export default Login;