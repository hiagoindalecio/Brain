import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
//importando paginas
import Home from './pages/Home';
import Initial from './pages/Initial';
import Login from './pages/Login';


const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Initial} path="/" exact />
            <Route component={Login} path='/login' exact />
            <Route component={Home} path='/home' exact/>
        </BrowserRouter>
    );
}

export default Routes;