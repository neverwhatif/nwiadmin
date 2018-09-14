import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const EmptyList = props => (
    <section className={styles.root}>
        <h1 className={styles.title}>{props.title}</h1>
        <p className={styles.description}>{props.description}</p>
    </section>
);

EmptyList.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
};

EmptyList.defaultProps = {
    title: 'No results found',
    description: 'If you think this is an error, please contact the site administrator',
};

export default EmptyList;
