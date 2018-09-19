import React from 'react';
import classNames from 'classnames';

import Allow from 'nwiadmin/components/allow';
import PrimarySubNavItem from '../primarysubnavitem';

import styles from './styles.scss';

const renderItem = (item, basePath, setActiveSubNav) => (
    <li key={item.path}>
        <PrimarySubNavItem {...item} basePath={basePath} setActiveSubNav={setActiveSubNav} />
    </li>
);

const PrimarySubNav = props => (
    <div className={classNames(styles.root, props.isOpen ? styles.rootIsOpen : null)}>
        <ul className={styles.list}>
            {props.data.children.map(item => (
                item.permission
                    ? (
                        <Allow permission={item.permission} key={item.key}>
                            {renderItem(item, props.data.path, props.setActiveSubNav)}
                        </Allow>
                    )
                    : renderItem(item, props.data.path, props.setActiveSubNav)
            ))}
        </ul>
        <i
            className={classNames(styles.close, props.isOpen ? styles.closeIsOpen : null)}
            onClick={() => props.setActiveSubNav(null)}
        />
    </div>
);

export default PrimarySubNav;
