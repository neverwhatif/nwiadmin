import React from 'react';
import PropTypes from 'prop-types';

// import Link from 'nwiadmin/components/link';

import styles from './styles.scss';

const Reference = props => (
    <span className={styles.root}>
        {props.title}
        {props.link ? (
            <a href={props.link} className={styles.reference}>{props.reference}</a>
        ) : (
            <span className={styles.reference}>{props.reference}</span>
        )}
    </span>
);

Reference.propTypes = {
    title: PropTypes.string.isRequired,
    reference: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    link: PropTypes.string,
};

Reference.defaultProps = {
    link: null,
};

export default Reference;
