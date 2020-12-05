import React, { useEffect, useState, ChangeEvent } from 'react';
import './styles.css';
import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';

import Initial from '../../components/Initial';
import Daily from '../../components/Daily';
import Family from '../../components/Family';

const Home = () => {
    const [component, setComponent] = useState<JSX.Element>();
    useEffect(() => {
        setComponent(Initial);
    }, [])
    function handleSelectedField(componentName: string) {
        switch(componentName) {
            case 'Daily':
                setComponent(Daily);
                break;
            case 'Family':
                setComponent(Family);
                break;
            case 'Home':
                setComponent(Initial);
                break;
        }
    }
    const[click,setClick] = useState(false);
    const [button, setButton] = useState(true);
    
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
          setButton(false);
        } else {
          setButton(true);
        }
      };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);
    return (
        <div id="home-page">
            <div className="content">
                <header className="header">
                    <div className="header-logo">
                        <h1 className="header-text">Brain</h1>
                        <img src={logo} alt="logo" className="img-logo"/>
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
                                    Meu Dia
                                </li>
                                <li className='nav-item' onClick={() => handleSelectedField("Family")}>
                                    Minha Família
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