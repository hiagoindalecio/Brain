import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import './styles.css';
import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';
import { Route, Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import logo from '../../assets/logo.png'

const Login:React.FC = () => {
    interface userValidationResponse {
        id: number,
        name: string,
        points: number,
        message: string
    }
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [userValidation, setUserValidation] = useState<userValidationResponse>({
        id: 0,
        name: '',
        points: 0,
        message: ''
    });

    useEffect(() => {
        if(userValidation.message === 'Usuário validado com sucesso!') {
            //alert(`Id: ${userValidation.id}\nName: ${userValidation.name}\nPoints: ${userValidation.points}\nMessage: ${userValidation.message}`);
            var textPath: string = `home/${userValidation.id}/${userValidation.name}/${userValidation.points}`;
            const history = useHistory();
            history.push(textPath);
        } else if (userValidation.message !== '') {
            alert(`Erro ao autenticar usuário!\n${userValidation.message}`);
        }
    }, [userValidation]);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        //alert(`Email: ${formData.email}\nSenha: ${formData.password}`);
        await api.get(`uservalidate/${formData.email}/${formData.password}`).then(response => {
            setUserValidation(response.data);
        });
    };
    return(
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
    );
}

export default Login;