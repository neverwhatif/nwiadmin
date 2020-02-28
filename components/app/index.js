import React, { Fragment, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { get } from 'nwiadmin/services/api';
import { checkAuthResponse } from 'nwiadmin/services/auth';

import routes from 'app/config/routes';

import { AppContextProvider } from 'nwiadmin/services/context';
import Banner from 'nwiadmin/components/banner';
import Loading from 'nwiadmin/components/loading';
import Notify from 'nwiadmin/components/notify';

import Login from 'nwiadmin/components/login';
import ResetPassword from 'nwiadmin/components/login/resetpassword';
import SecurityScene from 'nwiadmin/scenes/security';
import PreferenceScene from 'app/components/preferences';
import Error404Scene from 'nwiadmin/scenes/404';

import 'nwiadmin/utility/styles/elements.scss';
import 'nwiadmin/utility/styles/layout.scss';
import 'app/config/classes.scss';

const renderRoute = (route) => {
    if(!route.path) {
        return null;
    }
    const path = route.path === '/' ? '/' : `/${route.path}`;
    return (<Route key={path} path={path} exact={route.isExact || false} component={route.component} />);
};

const App = () => {
    const [me, setMe] = useState(null);
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const getData = async () => {
        try {
            const response = await get('me');
            setMe(response.data);
        } catch(err) {
            setError(true);
            checkAuthResponse(err);
        }

        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, []);

    if (isLoading) {
        return (
            <Loading isFullscreen />
        );
    }

    return (
        <AppContextProvider value={{me}}>
            <Fragment>
                <Banner isError={isError} />
                <Switch>
                    { routes.map(route => renderRoute(route)) }
                    <Route path="/login" component={Login} />
                    <Route path="/reset/:token" component={ResetPassword} />
                    <Route path="/security" component={SecurityScene} />
                    <Route path="/preferences" component={PreferenceScene} />
                    <Route component={Error404Scene} />
                </Switch>
                <Notify />
            </Fragment>
        </AppContextProvider>
    );
}

export default App;
