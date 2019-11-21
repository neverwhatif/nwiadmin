import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import { get } from 'nwiadmin/services/api';
import { checkAuthResponse } from 'nwiadmin/services/auth';

import routes from 'app/config/routes';

import MeProvider from 'nwiadmin/services/me/meprovider';
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

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            me: null,
            isError: false,
            isLoading: true,
        };
    }
    componentWillMount() {
        get('me').then((response) => {
            this.setState({
                me: response.data,
                isError: false,
                isLoading: false,
            });
        }).catch((error) => {
            this.setState({
                isError: true,
                isLoading: false,
            });
            checkAuthResponse(error);
        });
    }
    render() {
        if (this.state.isLoading) {
            return (
                <Loading isFullscreen />
            );
        }

        return (
            <MeProvider me={this.state.me}>
                <Fragment>
                    <Banner isError={this.state.isError} />
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
            </MeProvider>
        );
    }
}

export default App;
