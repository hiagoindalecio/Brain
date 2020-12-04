import React, { useEffect, useState, ChangeEvent } from 'react';
import './styles.css';
import '../../bootstrap-4.5.3-dist/css/bootstrap.min.css';

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
        }
    }
    return (
        <div id="home-page">
            <div className="content">
                <header className="row">
                    <div id="header-logo" className="col-xs-6 col-md-3">
                        <h1>Brain</h1>
                    </div>
                </header>
                <main className="container">
                    <section className="btn-group" role="group">
                        <button type="button" className="btn btn-secondary" onClick={() => handleSelectedField("Daily")}>Meu Dia</button>
                        <button type="button" className="btn btn-secondary" onClick={() => handleSelectedField("Family")}>Minha Família</button>
                        <button type="button" className="btn btn-secondary">Atividades</button>
                    </section>
                </main>
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