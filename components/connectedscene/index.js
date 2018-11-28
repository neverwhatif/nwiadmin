import React, { Children, cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';

import { withConnected, defaultWithConnected } from 'nwiadmin/utility/proptypes';
import store from 'nwiadmin/utility/store';

import { checkAuthResponse } from 'nwiadmin/services/auth';

import Scene from 'nwiadmin/components/scene';
import ErrorMessage from 'nwiadmin/components/errormessage';
import Loading from 'nwiadmin/components/loading';

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

class ConnectedScene extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDataLoading: true,
            dataError: '',
            data: {},
            transformed: {},
        };
    }

    componentWillMount() {
        this.subscription = PubSub.subscribe('@currentScene/SET_DATA', (_key, data) => {
            const transformed = this.props.transformer(data);

            this.setState({
                data,
                transformed,
                isDataLoading: false,
            });

            setDocumentTitle(transformed.title);
        });
        this.getData();
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.subscription);
    }

    getData() {
        this.setState({
            isDataLoading: true,
        });

        const parsedRemote = parseRemote(this.props.remote);

        get(parsedRemote.alias, parsedRemote.params)
            .then((response) => {
                PubSub.publish('@currentScene/SET_DATA', response.data);
            })
            .catch((error) => {
                checkAuthResponse(error, () => {
                    this.setState({ dataError: error.toString() });
                });
            });
    }

    getTitle() {
        return this.props.title && typeof this.props.title === 'function'
            ? this.props.title(this.state.data)
            : this.state.transformed.title;
    }

    render() {
        if (this.state.dataError) {
            return (
                <Scene title="Error">
                    <ErrorMessage title={false} details={this.state.dataError} />
                </Scene>
            );
        }

        const {
            remote,
            transformer,
            title,
            ...otherProps
        } = this.props;

        if (this.state.isDataLoading) {
            return (
                <Scene title={getPreloadedTitle()} shouldSetDocumentTitle={false} {...otherProps}><Loading /></Scene>
            );
        }

        const childrenWithData = Children.map(this.props.children, (child) => {
            if(!child) {
                return null;
            }
            return cloneElement(child, { data: this.state.data });
        });

        return (
            <Scene
                basePath={this.props.basePath}
                title={this.getTitle()}
                subtitle={this.state.transformed.subtitle}
                {...otherProps}
            >
                {childrenWithData}
            </Scene>
        );
    }
}

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
