import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Link from 'nwiadmin/components/link';

import styles from './styles.scss';

const scrollToTop = () => {
    window.scroll(0, 0);
};

const PaginationItem = (props) => {
    if (props.type === 'link') {
        const rootClass = classNames(
            styles.root,
            styles.rootLink,
            props.isCurrent ? styles.rootCurrent : null,
        );

        return (
            <Link to={props.to} className={rootClass} onClick={() => scrollToTop()}>{props.label}</Link>
        );
    }

    return (
        <span className={styles.ellipsis}>...</span>
    );
};

PaginationItem.propTypes = {
    type: PropTypes.oneOf(['link', 'ellipsis']),
    label: PropTypes.number,
    to: PropTypes.string,
    isCurrent: PropTypes.bool,
};

PaginationItem.defaultProps = {
    type: 'link',
    label: null,
    to: null,
    isCurrent: false,
};

export default PaginationItem;
