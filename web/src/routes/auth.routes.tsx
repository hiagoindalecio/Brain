import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Login from '../pages/Login';
import Initial from '../pages/Initial';

const AuthRoutes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact component={Initial} path="/"  />
                <Route exact component={Login} path="/home" />
            </Switch>
        </BrowserRouter>
    );
}

export default AuthRoutes;