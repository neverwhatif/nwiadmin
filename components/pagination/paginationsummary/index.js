import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const PaginationSummary = props => (
    <div className={styles.root}>
        <strong>{props.from}</strong> - <strong>{props.to}</strong> of <strong>{props.total}</strong>
    </div>
);

PaginationSummary.propTypes = {
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
};

export default PaginationSummary;
