import React from 'react';
import PropTypes from 'prop-types';

import { getPagination, getPaginationSummary } from 'nwiadmin/services/pagination';

import PaginationItem from './paginationitem';
import PaginationSummary from './paginationsummary';

import styles from './styles.scss';

const Pagination = (props) => {
    const { data, location } = props;

    if (!data.from || !data.to || data.last_page === 1) {
        return null;
    }

    return (
        <footer className={styles.root}>
            <PaginationSummary {...getPaginationSummary(data)} />
            <ul className={styles.list}>
                {getPagination(data, location).map((item, index) => (
                    <li key={item.label || `${item.type}${index}`} className={styles.item}>
                        <PaginationItem {...item} />
                    </li>
                ))}
            </ul>
        </footer>
    );
};

Pagination.propTypes = {
    data: PropTypes.shape({
        current_page: PropTypes.number.isRequired,
        last_page: PropTypes.number.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        search: PropTypes.string,
    }).isRequired,
};

export default Pagination;
