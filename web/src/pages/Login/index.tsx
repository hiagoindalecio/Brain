import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
import './styles.css';
import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';

import AuthContext from '../../contexts/auth';

import logo from '../../assets/logo.png'

const Login: React.FC = () => {
    const { singIn, createUser } = useContext(AuthContext);
    const [secondEmail, setSecondEmail] = useState<JSX.Element>();
    const [secondPassword, setSecondPassword] = useState<JSX.Element>();
    const [nameUser, setNameUser] = useState<JSX.Element>();
    const [action, setAction] = useState<String>('Entrar');
    const [formData, setFormData] = useState({
        nameUser: '',
        email: '',
        email2: '',
        password: '',
        password2: ''
    });

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    async function handleSubmit(event: FormEvent) {
        if(action === 'Entrar') {
            event.preventDefault();
            await singIn(formData.email, formData.password);
        } else if (action === 'Criar conta') {
            event.preventDefault();
            console.log(formData);
            // event.preventDefault();
            // //alert(`Email 1: ${formData.email}\nEmail 2: ${formData.email2}`)
            // if(formData.email === formData.email2 && formData.password === formData.password2 && formData.name !== '') {
            //     const reply = await createUser(formData.email, formData.password, formData.name);
            //     alert(reply);
            // } else if (formData.email !== formData.email2) {
            //     alert('Os dois endereços de e-mail devem ser indênticos!');
            // } else if (formData.password !== formData.password2) {
            //     alert('Os dois campos de senha devem ser idênticos!');
            // } else if (formData.name === '') {
            //     alert('Você deve preencher o campo de nome!');
            // }
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
                    <input type="email" name="email2" className="form-control" id="InputEmail2" aria-describedby="emailHelp" onChange={handleInputChange} />
                </div>
            );
            setSecondPassword(
                <div className="form-group">
                    <label htmlFor="InputPassword2">Confime sua senha:</label>
                    <input type="password" name="password2" className="form-control" id="InputPassword2" onChange={handleInputChange} />
                </div>
            )
            setNameUser(
                <div className="form-group">
                    <label htmlFor="InputName">Informe seu nome:</label>
                    <input type="text" name="nameUser" className="form-control" id="InputName" onChange={handleInputChange} />
                </div>
            )
        }
    }

    return(
        <fieldset>
            <div id="login-page">
                <div className="content">
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
                            <input type="email" name="email" className="form-control" id="InputEmail1" aria-describedby="emailHelp" onChange={handleInputChange} />
                            <small id="emailHelp" className="form-text text-muted">Nós nunca iremos compartilhar seu e-mail com ninguém.</small>
                        </div>
                        {
                            secondEmail
                        }
                        <div className="form-group">
                            <label htmlFor="InputPassword1">Senha</label>
                            <input type="password" name="password" className="form-control" id="InputPassword1" onChange={handleInputChange} />
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