import React from 'react';
import './styles.css';
import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Pedro from '../../assets/Pedro.png';
import logo from '../../assets/logo.png'

const Initial:React.FC = () => {
    return(
        <div id="initial-page">
            <div className="content">
                <header className="header">
                    <div className="header-logo">
                        <h1 className="header-text">Brain</h1>
                        <img src={logo} alt="logo" className="img-logo"/>
                    </div>
                </header>
                <form className="apresentation">
                    <h4 className="text">Olá amigo! Seja bem vindo ao Brain. Vamos até o seu espaço?<br/><br/>_Pedro</h4>
                    <img src={Pedro} alt="Pedro" className="avatar-img"/>
                    <Link to="/login" className="link-button">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>
                            <p>Acessar meu espaço.</p>
                        </strong>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Initial;