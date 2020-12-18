import React, { useEffect, useState, useContext } from 'react';
import './styles.css';
import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/auth';

import logo from '../../assets/logo.png';

import Initial from '../../components/Initial';
import Daily from '../../components/Daily';
import Family from '../../components/Family';


const Home: React.FC = () =>  {
    interface User {
        id: number;
        name: string;
        points: number;
    }

    const { singOut, user } = useContext(AuthContext);
    const [points, setPoints] = useState<number>(0);
    const [component, setComponent] = useState<JSX.Element>();
    const [click, setClick] = useState(false);

    interface Checkpoints {
        title: string,
        date: string
    }

    useEffect(() => {
        var check: Checkpoints = {
            title: 'Sorta Pipa',
            date: '20/02/2021'
        };
        const currentUser = user as unknown as User;
        setPoints(currentUser ? currentUser.points : 0);
        setComponent(Initial(currentUser ? currentUser.name : '', [
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
                const currentUser = user as unknown as User;
                setComponent(Initial(currentUser ? currentUser.name : '', []));
                break;
        }
    }
    function handleLogoff() {
        singOut();
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
                        <h4>Pontos: {points}</h4>
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
                                <button className="link-btn" onClick={handleLogoff}>
                                    <li className='nav-item' onClick={closeMobileMenu}>
                                        Sair
                                    </li>
                                </button>
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