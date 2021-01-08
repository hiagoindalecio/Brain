import React, { useEffect, useState, useContext } from 'react';
import './styles.css';
import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';
import { FaBars, FaTimes } from 'react-icons/fa';

import AuthContext from '../../contexts/auth';
import CheckpointsContext from '../../contexts/checkpoints';

import logo from '../../assets/logo.png';

import Initial from '../../subpages/Initial';
import CheckpointsList from '../../subpages/CheckpointsList';

interface Task {
    idTask: number,
    idCheck: number,
    summary: String,
    desc: String,
    status: boolean
}

interface CheckpointsData {
    cod: number,
    codUser: number,
    summary: string,
    limitdate: string,
    description: string,
    tasks: Task[];
}

const Home: React.FC = () =>  {
    const { singOut, user } = useContext(AuthContext);
    const { getCheckpoints } = useContext(CheckpointsContext);
    const [component, setComponent] = useState<JSX.Element>(<Initial userName={user ? user.name : null} />);
    const [click, setClick] = useState(false);

    async function handleSelectedField(componentName: string) {
        switch(componentName) {
            case 'Home': {
                setComponent(<Initial userName={user ? user.name : null} />);
                break;
            }
            case 'Checkpoints': {
                var reply = await getCheckpoints(user ? user.id as number : -1);
                // const reply: CheckpointsData[] =
                //     [
                //         {
                //             cod: 2,
                //             codUser: 1, 
                //             summary: "Criar Fanfic", 
                //             limitdate: "2021-01-29", 
                //             description: "Criar fanfic do Restart até segunda.",
                //             tasks: [
                //                 {
                //                     idTask: 2,
                //                     idCheck: 2,
                //                     summary: "Recolher fotos do Pelanza",
                //                     desc: "Fotos do Pelanza são as mais necessárias para a Fanfic",
                //                     status: true
                //                 }
                //             ]
                //         }
                //     ]
                setComponent(<CheckpointsList checkpointsResponse={ reply } />);
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
                            <h4>Pontos: {user ? user.points : '0'}</h4>
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
                                    <li className='nav-item' onClick={() => handleSelectedField('Notas')}>
                                        Minhas Notas
                                    </li>
                                    <li className='nav-item' onClick={() => handleSelectedField('Sobre')}>
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