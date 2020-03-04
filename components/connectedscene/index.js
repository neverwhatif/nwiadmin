import React, { Children, cloneElement, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';

import { withConnected, defaultWithConnected } from 'nwiadmin/utility/proptypes';
import store from 'nwiadmin/utility/store';

import { checkAuthResponse } from 'nwiadmin/services/auth';

import Scene from 'nwiadmin/components/scene';
import ErrorMessage from 'nwiadmin/components/errormessage';
import Loading from 'nwiadmin/components/loading';
import Message from 'nwiadmin/components/message';

import { setDocumentTitle } from 'nwiadmin/services/app';
import { get } from 'nwiadmin/services/api';
import { parseRemote } from 'nwiadmin/utility';

const getPreloadedTitle = () => {
    const preload = store.getItem('preload');
    if (preload) {
        store.removeItem('preload');
        return preload;
    }
    return '•••';
};

const ConnectedScene = ({
    basePath,
    children,
    message,
    remote,
    transformer,
    title,
    ...otherProps
}) => {
    const [data, setData] = useState({});
    const [transformed, setTransformed] = useState({});

    const [dataError, setDataError] = useState('');
    const [isDataLoading, setDataLoading] = useState(true);

    const getTitle = () => (title && typeof title === 'function' ? title(data) : transformed.title);

    const getData = async () => {
        setDataLoading(true);

        const parsedRemote = parseRemote(remote);

        try {
            const response = await get(parsedRemote.alias, parsedRemote.params);
            PubSub.publish('@currentScene/SET_DATA', response.data);
        } catch (err) {
            checkAuthResponse(err, setDataError);
        }
    };

    useEffect(() => {
        const subscription = PubSub.subscribe('@currentScene/SET_DATA', (_key, data) => {
            const transformed = transformer(data);

            setData(data);
            setTransformed(transformed);
            setDataLoading(false);

            setDocumentTitle(transformed.title);
        });

        getData();

        return () => {
            PubSub.unsubscribe(subscription);
        };
    }, []);

    if (dataError) {
        return (
            <Scene title="Error">
                <ErrorMessage title={false} details={dataError} />
            </Scene>
        );
    }

    if (isDataLoading) {
        return (
            <Scene title={getPreloadedTitle()} shouldSetDocumentTitle={false} {...otherProps}>
                <Loading />
            </Scene>
        );
    }

    const childrenWithData = Children.map(children, (child) => {
        if (!child) {
            return null;
        }
        return cloneElement(child, { data });
    });

    const messageString = message ? message(data) : null;

    return (
        <Scene
            basePath={basePath}
            title={getTitle()}
            subtitle={transformed.subtitle}
            {...otherProps}
        >
            {Boolean(messageString) && <Message type="notify">{messageString}</Message>}
            {childrenWithData}
        </Scene>
    );
};

ConnectedScene.propTypes = {
    ...withConnected,
    basePath: PropTypes.string,
    children: PropTypes.node.isRequired,
};

ConnectedScene.defaultProps = {
    ...defaultWithConnected,
    basePath: '',
};

export default ConnectedScene;
