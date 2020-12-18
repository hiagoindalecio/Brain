import React from 'react';
import { Route, BrowserRouter, RouteComponentProps, Switch, Redirect } from 'react-router-dom';
//importando paginas
import Home from '../pages/Home';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact component={Home} path="/home" />
            </Switch>
        </BrowserRouter>
    );
}

export default AppRoutes;