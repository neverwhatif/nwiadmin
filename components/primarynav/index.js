import React, { Component, Fragment } from 'react';
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
        <PrimaryNavItem {...item} toggleActiveSubNav={path => toggleActiveSubNav(path)} isOpen={isOpen} />
    </li>
);

export class PrimaryNavComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSubNav: null,
        };

        this.setActiveSubNav = this.setActiveSubNav.bind(this);
        this.toggleActiveSubNav = this.toggleActiveSubNav.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.location.pathname !== this.props.location.pathname) {
            this.setActiveSubNav(false);
        }
    }

    setActiveSubNav(activeSubNav) {
        this.setState({ activeSubNav });
    }

    toggleActiveSubNav(activeSubNav) {
        this.setState({ activeSubNav: this.state.activeSubNav === activeSubNav ? null : activeSubNav });
    }

    render() {
        const nav = getPrimaryNav(this.props.location.pathname);
        const preferences = store.getObject('preferences');
        const rootClass = classNames(
            styles.root,
            preferences && preferences.pink ? styles.rootPink : null,
        );

        return (
            <Fragment>
                <ul className={rootClass}>
                    {nav.map(item => (
                        item.permission
                            ? (
                                <Allow permission={item.permission} key={item.key}>
                                    {renderItem(item, this.toggleActiveSubNav, this.state.activeSubNav === item.path)}
                                </Allow>
                            )
                            : renderItem(item, this.toggleActiveSubNav, this.state.activeSubNav === item.path)
                    ))}
                </ul>
                {nav.filter(item => item.children && item.children.length).map(item => (
                    <PrimarySubNav
                        key={item.path}
                        data={item}
                        isOpen={this.state.activeSubNav === item.path}
                        setActiveSubNav={this.setActiveSubNav}
                    />
                ))}
            </Fragment>
        );
    }
}

PrimaryNavComponent.propTypes = {
    ...withLocation,
};

export default withRouter(PrimaryNavComponent);
