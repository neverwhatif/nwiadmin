import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const FixedBar = props => (
    <footer className={styles.root}>
        {props.children}
    </footer>
);

FixedBar.propTypes = {
    children: PropTypes.node.isRequired,
};

export default FixedBar;
