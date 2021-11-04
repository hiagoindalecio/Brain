import { Route, BrowserRouter, Switch} from 'react-router-dom';
//importando paginas
import Home from '../pages/Home';
import ConfigScreen from '../pages/ConfigScreen';
import ProfileView from '../pages/ProfileView';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact component={Home} path="/" />
                <Route exact component={Home} path="/home" />
                <Route exact component={ConfigScreen} path="/config" />
                <Route exact component={ProfileView} path="/profile/:id" />
            </Switch>
        </BrowserRouter>
    );
}

export default AppRoutes;