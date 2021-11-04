import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Login from '../pages/Login';
import Initial from '../pages/Initial';
import ProfileView from '../pages/ProfileView';

const AuthRoutes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact component={Initial} path="/"  />
                <Route exact component={Login} path="/home" />
                <Route exact component={ProfileView} path="/profile/:id" />
            </Switch>
        </BrowserRouter>
    );
}

export default AuthRoutes;