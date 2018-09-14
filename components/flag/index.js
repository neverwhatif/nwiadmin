import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.scss';

const Flag = props => (
    <span className={classNames(styles.root, props.isOffset ? styles.rootIsOffset : null)}>
        {props.children}
    </span>
);

Flag.propTypes = {
    children: PropTypes.node.isRequired,
    isOffset: PropTypes.bool,
};

Flag.defaultProps = {
    isOffset: false,
};

export default Flag;
