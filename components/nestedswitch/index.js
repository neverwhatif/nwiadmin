import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { buildNestedPath } from 'nwiadmin/services/nav';

import Error404Scene from 'nwiadmin/scenes/404';

export const renderRoute = (route, basePath, switchData) => {
    const Component = route.component;
    const data = {
        ...switchData,
        ...route.data || {},
    };

    return (
        <Route
            exact={!route.path || route.isExact}
            key={route.path}
            path={buildNestedPath(basePath, route.path)}
            render={componentProps => (<Component {...componentProps} basePath={basePath} data={data} />)}
        />
    );
};

const NestedSwitch = ({ routes, basePath, data }) => (
    <Switch>
        {routes.map(route => renderRoute(route, basePath, data))}
        <Route component={Error404Scene} />
    </Switch>
);

NestedSwitch.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.string.isRequired,
        component: PropTypes.func,
    })).isRequired,
    basePath: PropTypes.string,
    data: PropTypes.shape({}),
};

NestedSwitch.defaultProps = {
    basePath: '',
    data: null,
};

export default NestedSwitch;
