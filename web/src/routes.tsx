import React from 'react';
import { Route, BrowserRouter, RouteComponentProps, Switch, Redirect } from 'react-router-dom';
//importando paginas
import Home from './pages/Home';
import Initial from './pages/Initial';
import Login from './pages/Login';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact component={Initial} path="/"  />
                <Route exact component={Login} path='/login' />
                <Route exact component={Home} path='/home/:id/:name/:points' />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;