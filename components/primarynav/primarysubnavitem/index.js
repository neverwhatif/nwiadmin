import React from 'react';
import classNames from 'classnames';

import { buildNestedPath } from 'nwiadmin/services/nav';
import { stringifyRemote } from 'nwiadmin/utility';

import Link from 'nwiadmin/components/link';

import styles from './styles.scss';

const PrimarySubNavItem = (props) => {
    const rootClass = classNames(
        styles.root,
        props.isActive ? styles.rootActive : null,
        props.isDisabled ? styles.rootDisabled : null,
    );
    const path = props.filters ? stringifyRemote([props.path, { filter: props.filters }]) : props.path;

    return (
        <Link to={path} className={rootClass} onClick={() => props.setActiveSubNav(null)}>{props.label}</Link>
    );
};

export default PrimarySubNavItem;
