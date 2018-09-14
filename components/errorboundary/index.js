import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from 'nwiadmin/components/errormessage';
import Scene from 'nwiadmin/components/scene';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }
    componentDidCatch(error) {
        this.setState({
            error,
        });
    }
    render() {
        if (this.state.error) {
            return this.props.isScene ? <Scene title="Error"><ErrorMessage title={false} /></Scene> : <ErrorMessage />;
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
    isScene: PropTypes.bool,
};

ErrorBoundary.defaultProps = {
    isScene: false,
};

export default ErrorBoundary;
