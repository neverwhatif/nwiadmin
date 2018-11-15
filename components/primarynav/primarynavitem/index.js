import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import meable from 'nwiadmin/services/me/meable';
import { clearNotify } from 'nwiadmin/services/notify';

import { stringifyRemote } from 'nwiadmin/utility';

import Link from 'nwiadmin/components/link';

import styles from './styles.scss';

const PrimaryNavItem = (props) => {
    const rootClass = classNames(
        styles.root,
        props.children ? styles.rootHasChildren : null,
        props.isActive ? styles.rootActive : null,
        props.isDisabled ? styles.rootDisabled : null,
        props.isOpen ? styles.rootOpen : null,
    );

    const path = props.filters ? stringifyRemote([props.path, { filter: props.filters }]) : props.path;
    const isUnauthed = props.children && props.children.filter(item => !item.permission || props.me.permissions.indexOf(item.permission) > -1).length === 0;

    if(isUnauthed) {
        return null;
    }

    return props.children ? (
        <span className={rootClass} onClick={() => props.toggleActiveSubNav(props.path)}>{props.label}</span>
    ) : (
        <Link to={path} className={rootClass} onClick={() => clearNotify()}>{props.label}</Link>
    );
};

PrimaryNavItem.propTypes = {
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    isDisabled: PropTypes.bool,
    filters: PropTypes.shape({}),
};

PrimaryNavItem.defaultProps = {
    isActive: false,
    isDisabled: false,
    filters: null,
};

export default meable(PrimaryNavItem);
