import { Component, Children } from 'react';
import { PropTypes } from 'prop-types';

class MeProvider extends Component {
    getChildContext() {
        const { me } = this.props;
        return { me };
    }
    render() {
        return Children.only(this.props.children);
    }
}

MeProvider.childContextTypes = {
    me: PropTypes.object,
};

MeProvider.propTypes = {
    children: PropTypes.node.isRequired,
    me: PropTypes.shape({}),
};

MeProvider.defaultProps = {
    me: null,
};

export default MeProvider;
