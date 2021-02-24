import React from 'react';
import { Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
//importando paginas
import Home from '../pages/Home';
import ConfigScreen from '../pages/ConfigScreen';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact component={Home} path="/" />
                <Route exact component={Home} path="/home" />
                <Route exact component={ConfigScreen} path="/config" />
            </Switch>
        </BrowserRouter>
    );
}

export default AppRoutes;