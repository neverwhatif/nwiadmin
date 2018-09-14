import React from 'react';
import PropTypes from 'prop-types';

import { PrimaryButton } from 'nwiadmin/components/button';

import styles from './styles.scss';

const reload = () => window.location.reload();

const ErrorMessage = props => (
    <section className={styles.root}>
        {props.title !== false && (
            <h1 className={styles.title}>{props.title}</h1>
        )}

        {props.description && (
            <p className={styles.description}>{props.description}</p>
        )}

        {props.details && (
            <small className={styles.details}><strong>Details:</strong> {props.details}</small>
        )}

        <p className={styles.cta}>
            <PrimaryButton onClick={() => reload()}>Reload</PrimaryButton>
        </p>
    </section>
);

ErrorMessage.propTypes = {
    title: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    description: PropTypes.string,
    details: PropTypes.string,
};

ErrorMessage.defaultProps = {
    title: 'Error',
    description: 'Sorry, something appears to have gone wrong. Please contact the site administrator.',
    details: null,
};

export default ErrorMessage;
