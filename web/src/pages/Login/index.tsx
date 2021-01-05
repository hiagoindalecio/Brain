import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
import './styles.css';
import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';

import AuthContext from '../../contexts/auth';

import logo from '../../assets/logo.png'

const Login: React.FC = () => {
    const { singIn } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const sing = await singIn(formData.email, formData.password);
        if(!!sing) {
            alert('Sucesso!');
        } else {
            alert('Email ou senha digitados incorretamente');
        }
    };

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
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Endereço de e-mail</label>
                            <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleInputChange} />
                            <small id="emailHelp" className="form-text text-muted">Nós nunca iremos compartilhar seu e-mail com ninguém.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Senha</label>
                            <input type="password" name="password" className="form-control" id="exampleInputPassword1" onChange={handleInputChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submeter</button>
                    </form>
                </div>
            </div>
        </fieldset>
        
    );
}

export default Login;