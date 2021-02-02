import React, { useState, useContext, useLayoutEffect } from 'react';
import './styles.css';
import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';
import { FaBars, FaTimes } from 'react-icons/fa';

import AuthContext from '../../contexts/auth';
import CheckpointsContext from '../../contexts/checkpoints';
import NotesContext from '../../contexts/notes';

import logo from '../../assets/logo.png';
import pointsImage from '../../assets/point.png';

import Initial from '../../subpages/Initial';
import CheckpointsList from '../../subpages/CheckpointsList';
import AboutBrain from '../../subpages/AboutBrain';
import NotesList from '../../subpages/NotesList';

const Home: React.FC = () =>  {
    const { singOut, user, currentScreen, selectScreen } = useContext(AuthContext);
    const { getCheckpoints } = useContext(CheckpointsContext);
    const { getNotes } = useContext(NotesContext);
    const [component, setComponent] = useState<JSX.Element>(<div />);
    const [click, setClick] = useState(false);

    useLayoutEffect(() => {
        handleSelectedField(currentScreen);
    }, []);

    async function handleSelectedField(componentName: string) {
        selectScreen(componentName);
        switch(componentName) {
            case 'Home': {
                setComponent(<Initial userName={user ? user.name : null} pointsUser={user ? user.points : null} />);
                break;
            }
            case 'Checkpoints': {
                setComponent(<CheckpointsList checkpointsResponse={ await getCheckpoints(user ? user.id as number : -1) } />);
                break;
            }
            case 'AboutBrain': {
                setComponent(<AboutBrain />);
                break;
            }
            case 'Notes': {
                setComponent(<NotesList notesResponse={ await getNotes(user ? user.id as number : -1) } />);
                break;
            }
        }
    }
    function handleLogoff() {
        singOut();
    }
    
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <fieldset>
            <div id="home-page">
                <div className="content">
                    <header className="header">
                        <div className="header-logo">
                            <h1 className="header-text">Brain</h1>
                            <img src={logo} alt="logo" className="img-logo"/>
                        </div>
                        <div className="header-points">
                            <img src={pointsImage} alt="logo" className="img-logo"/>
                            <h4>&nbsp;{user ? user.points : '0'}</h4>
                        </div>
                    </header>
                        <div className="navbar">
                            <div className="navbar-container container">
                                <div className="menu-icon" onClick={handleClick}>
                                    {click ? <FaTimes /> : <FaBars />}   
                                </div>
                                <ul className={click ? 'nav-menu active' : 'nav-menu'} onClick={closeMobileMenu}>
                                    <li className='nav-item' onClick={() => handleSelectedField('Home')}>
                                        Home
                                    </li>
                                    <li className='nav-item' onClick={() => handleSelectedField('Checkpoints')}>
                                        Meus Checkpoints
                                    </li>
                                    <li className='nav-item' onClick={() => handleSelectedField('Notes')}>
                                        Minhas Notas
                                    </li>
                                    <li className='nav-item' onClick={() => handleSelectedField('AboutBrain')}>
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
        </fieldset>
    );
}

export default Home;