import React, { useEffect, useState, useContext } from 'react';
import './styles.css';
import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/auth';
import CheckpointsContext from '../../contexts/checkpoints';

import logo from '../../assets/logo.png';

import Initial from '../../components/Initial';


const Home: React.FC = () =>  {
    interface User {
        id: number | any;
        name: string;
        points: number;
    }

    const { singOut, user } = useContext(AuthContext);
    const { getThreeNextCheckpoints, checkpointsResponse } = useContext(CheckpointsContext);
    const [component, setComponent] = useState<JSX.Element>();
    const [click, setClick] = useState(false);

    /*interface Checkpoints {
        title: string,
        date: string
    }*/

    useEffect(() => {
        getThreeNextCheckpoints(user?.id as unknown as number);
        setComponent(Initial(user ? user.name : '', checkpointsResponse));
    }, []);

    

    function handleSelectedField(componentName: string) {
        switch(componentName) {
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
                        <h4>Pontos: {user ? user.points : '0'}</h4>
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
                                <li className='nav-item' onClick={() => handleSelectedField("Checkpoints")}>
                                    Meus Checkpoints
                                </li>
                                <li className='nav-item' onClick={() => handleSelectedField("Notas")}>
                                    Minhas Notas
                                </li>
                                <li className='nav-item' onClick={() => handleSelectedField("Sobre")}>
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