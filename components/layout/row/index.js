import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const Row = props => (
    <div className={styles.root}>{props.children}</div>
);

Row.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Row;
