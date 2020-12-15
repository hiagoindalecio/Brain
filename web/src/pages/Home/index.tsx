import React, { useEffect, useState, ChangeEvent } from 'react';
import './styles.css';
import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Request } from 'express';

import api from '../../services/api';

import logo from '../../assets/logo.png';

import Initial from '../../components/Initial';
import Daily from '../../components/Daily';
import Family from '../../components/Family';

interface MatchPropts {
    match: { 
        id: number, 
        name: string, 
        points: number 
    };
};

const Home: React.FC<MatchPropts> = ({ match }) =>  {
    interface User {    
        id: number,
        name: string,
        points: number
    }
    const [component, setComponent] = useState<JSX.Element>();
    const [button, setButton] = useState(true);
    const [currentScreen, setCurrentScreen] = useState<JSX.Element>();
    const [click, setClick] = useState(false);
    const [user, setUser] = useState<User>({
        id: match.id,
        name: match.name,
        points: match.points
    });

    interface Checkpoints {
        title: string,
        date: string
    }

    useEffect(() => {
        //setUser(match);
        alert(`Nome: ${match.name}\nId: ${match.id}\nPoints: ${match.points}`)
        var check: Checkpoints = {
            title: 'Sorta Pipa',
            date: '20/02/2021'
        };
        
        setComponent(Initial(user.name, [
            check
        ]));
    }, []);

    

    function handleSelectedField(componentName: string) {
        switch(componentName) {
            case 'Daily':
                setComponent(Daily);
                break;
            case 'Family':
                setComponent(Family);
                break;
            case 'Home':
                setComponent(Initial(user.name, []));
                break;
        }
    }
    
    
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <div id="home-page">
            <div className="content">
                <header className="header">
                    <div className="header-logo">
                        <h1 className="header-text">Brain</h1>
                        <img src={logo} alt="logo" className="img-logo"/>
                    </div>
                    <div className="header-points">
                        <h4>Points: {user.points}</h4>
                    </div>
                </header>
                    <div className="navbar">
                        <div className="navbar-container container">
                            <div className="menu-icon" onClick={handleClick}>
                                {click ? <FaTimes /> : <FaBars />}   
                            </div>
                            <ul className={click ? 'nav-menu active' : 'nav-menu'} onClick={closeMobileMenu}>
                                <li className='nav-item' onClick={() => handleSelectedField("Home")}>
                                    Home
                                </li>
                                <li className='nav-item' onClick={() => handleSelectedField("Daily")}>
                                    Meus Checkpoints
                                </li>
                                <li className='nav-item' onClick={() => handleSelectedField("Family")}>
                                    Minhas Notas
                                </li>
                                <li className='nav-item' onClick={() => handleSelectedField("")}>
                                    Sobre a Brain
                                </li>
                                <Link to="/" className="link-btn">
                                    <li className='nav-item' onClick={closeMobileMenu}>
                                        Sair
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                <form>
                    {
                        component
                    }
                </form>
            </div>
        </div>
    );
}

export default Home;