import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const Column = props => (
    <div className={styles.root}>{props.children}</div>
);

Column.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Column;
