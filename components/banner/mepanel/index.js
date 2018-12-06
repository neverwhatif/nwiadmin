import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Button from 'nwiadmin/components/button';

import { logout } from 'nwiadmin/services/auth';

import styles from './styles.scss';

class MePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
        this.toggleIsOpen = this.toggleIsOpen.bind(this);
    }

    toggleIsOpen() {
        this.setState(oldState => ({ isOpen: !oldState.isOpen }));
    }

    render() {
        const { data } = this.props;

        return (
            <aside className={styles.root}>
                <h2
                    className={styles.title}
                    onClick={this.toggleIsOpen}
                >
                    {data.name ? data.name : `${data.first_name} ${data.last_name}`}
                </h2>
                <div className={classNames(styles.panel, this.state.isOpen ? styles.panelOpen : null)}>
                    <div className={styles.panelItem}>
                        <Button buttonStyle="empty" to="/preferences" onClick={() => this.toggleIsOpen()}>Preferences</Button>
                    </div>
                    <div className={styles.panelItem}>
                        <Button buttonStyle="empty" to="/security" onClick={() => this.toggleIsOpen()}>Security</Button>
                    </div>
                    <div className={styles.panelItem}>
                        <Button buttonStyle="empty" onClick={() => logout()}>Log out</Button>
                    </div>
                </div>
            </aside>
        );
    }
}

MePanel.propTypes = {
    data: PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        name: PropTypes.string,
    }).isRequired,
};

export default MePanel;
