import React, { useState, useContext, useLayoutEffect } from 'react';
import './styles.css';
import { FaBars, FaTimes } from 'react-icons/fa';

import AuthContext from '../../contexts/auth';
import CheckpointsContext from '../../contexts/checkpoints';
import NotesContext from '../../contexts/notes';
import FriendsContex from '../../contexts/friends';

import logo from '../../assets/logo.png';
import pointsImage from '../../assets/point.png';

import Initial from '../../subpages/Initial';
import CheckpointsList from '../../subpages/CheckpointsList';
import AboutBrain from '../../subpages/AboutBrain';
import NotesList from '../../subpages/NotesList';
import SMenu from '../../components/StyledMenu';
import Feed from '../../subpages/Feed';

const Home: React.FC = () =>  {
    const { singOut, user, currentScreen, selectScreen } = useContext(AuthContext);
    const { getCheckpoints } = useContext(CheckpointsContext);
    const { getFriends } = useContext(FriendsContex);
    const { getNotes } = useContext(NotesContext);
    const [component, setComponent] = useState<JSX.Element>(<div />);
    const [click, setClick] = useState(false);

    useLayoutEffect(() => {
        handleSelectedField(currentScreen);
    }, []);

    function clearSelection() {
        let navButtons: HTMLCollectionOf<Element> = document.getElementsByClassName('nav-item');

        for (let i = 0; i < navButtons.length; i++) {
            navButtons[i].classList.remove('clicked-button');
        }
    }

    function selectItemById(idElement:string) {
        let buttonSelected: Element | null = document.getElementById(idElement);

        if (buttonSelected != null)
            buttonSelected.classList.add('clicked-button');
    }

    async function handleSelectedField(componentName: string) {
        selectScreen(componentName);
        clearSelection();
        switch(componentName) {
            case 'Home': {
                selectItemById('btnHome');
                setComponent(<Initial />);
                break;
            }
            case 'Feed': {
                selectItemById('btnFeed');
                setComponent(<Feed />);
                break;
            }
            case 'Checkpoints': {
                selectItemById('btnCheckpoints');
                setComponent(<CheckpointsList checkpointsResponse={ await getCheckpoints(user ? user.id as number : -1) } />);
                break;
            }
            case 'AboutBrain': {
                selectItemById('btnAbout');
                setComponent(<AboutBrain />);
                break;
            }
            case 'Notes': {
                selectItemById('btnNotes');
                setComponent(<NotesList notesResponse={ await getNotes(user ? user.id as number : -1) } />);
                break;
            }
        }
    }
    function handleLogoff() {
        singOut(user? user.email as string : '', user? user.password as string : '');
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
                        <div className="header-information">
                            <SMenu />
                            &nbsp;&nbsp;<img src={pointsImage} alt="score" className="img-logo"/>
                            <h4>&nbsp;{user ? user.points : '0'}</h4>
                        </div>
                    </header>
                        <div className="navbar">
                            <div className="navbar-container container">
                                <div className="menu-icon" onClick={handleClick}>
                                    {click ? <FaTimes /> : <FaBars />}   
                                </div>
                                <ul className={click ? 'nav-menu active' : 'nav-menu'} onClick={closeMobileMenu}>
                                    <li className='nav-item' onClick={() => handleSelectedField('Home')} id="btnHome" key="btnHome">
                                        Home
                                    </li>
                                    <li className='nav-item' onClick={() => handleSelectedField('Feed')} id="btnFeed" key="btnFeed">
                                        Feed
                                    </li>
                                    <li className='nav-item' onClick={() => handleSelectedField('Checkpoints')} id="btnCheckpoints" key="btnCheckpoints">
                                        Meus Checkpoints
                                    </li>
                                    <li className='nav-item' onClick={() => handleSelectedField('Notes')} id="btnNotes" key="btnNotes">
                                        Minhas Notas
                                    </li>
                                    <li className='nav-item' onClick={() => handleSelectedField('AboutBrain')} id="btnAbout" key="btnAbout">
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