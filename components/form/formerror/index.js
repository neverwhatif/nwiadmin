import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const FormError = props => (
    <p className={styles.root}>{props.children}</p>
);

FormError.propTypes = {
    children: PropTypes.node.isRequired,
};

export default FormError;
