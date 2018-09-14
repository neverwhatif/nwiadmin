import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { clearNotify } from 'nwiadmin/services/notify';

import Link from 'nwiadmin/components/link';

import styles from './styles.scss';

const TabItem = (props) => {
    const rootClass = classNames(
        styles.root,
        props.isActive ? styles.rootActive : null,
        props.isDisabled ? styles.rootDisabled : null,
    );

    return (
        <Link to={props.path} className={rootClass} onClick={() => clearNotify()}>
            {props.label}
        </Link>
    );
};

TabItem.propTypes = {
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    isDisabled: PropTypes.bool,
};

TabItem.defaultProps = {
    isActive: false,
    isDisabled: false,
};

export default TabItem;
