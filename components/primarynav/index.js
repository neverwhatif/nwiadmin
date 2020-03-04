import React, { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { withLocation } from 'nwiadmin/utility/proptypes';
import { getPrimaryNav } from 'nwiadmin/services/nav';
import store from 'nwiadmin/utility/store';

import Allow from 'nwiadmin/components/allow';
import PrimaryNavItem from './primarynavitem';
import PrimarySubNav from './primarysubnav';

import styles from './styles.scss';

const renderItem = (item, toggleActiveSubNav, isOpen) => (
    <li key={item.key}>
        <PrimaryNavItem
            {...item}
            toggleActiveSubNav={(path) => toggleActiveSubNav(path)}
            isOpen={isOpen}
        />
    </li>
);

export const PrimaryNavComponent = ({ location }) => {
    const [activeSubNav, setActiveSubNav] = useState(null);

    const toggleActiveSubNav = (path) => setActiveSubNav(activeSubNav === path ? null : path);

    const nav = getPrimaryNav(location.pathname);

    const preferences = store.getObject('preferences');
    const rootClass = classNames(
        styles.root,
        preferences && preferences.pink ? styles.rootPink : null
    );

    useEffect(() => {
        setActiveSubNav(false);
    }, [location.pathname]);

    return (
        <Fragment>
            <ul className={rootClass}>
                {nav.map((item) =>
                    item.permission ? (
                        <Allow permission={item.permission} key={item.key}>
                            {renderItem(item, toggleActiveSubNav, activeSubNav === item.path)}
                        </Allow>
                    ) : (
                        renderItem(item, toggleActiveSubNav, activeSubNav === item.path)
                    )
                )}
            </ul>
            {nav
                .filter((item) => item.children && item.children.length)
                .map((item) => (
                    <PrimarySubNav
                        key={item.path}
                        data={item}
                        isOpen={activeSubNav === item.path}
                        setActiveSubNav={setActiveSubNav}
                    />
                ))}
        </Fragment>
    );
};

PrimaryNavComponent.propTypes = {
    ...withLocation,
};

export default withRouter(PrimaryNavComponent);
