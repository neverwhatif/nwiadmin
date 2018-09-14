import React from 'react';
import PropTypes from 'prop-types';

import Button from 'nwiadmin/components/button';

import { logout } from 'nwiadmin/services/auth';

import styles from './styles.scss';

const MePanel = props => (
    <aside className={styles.root}>
        <h2 className={styles.title}>{props.data.name}</h2>
        <Button buttonStyle="empty" to="/security">Security</Button>
        &nbsp;&nbsp;&nbsp;&bull;&nbsp;&nbsp;&nbsp;
        <Button buttonStyle="empty" onClick={() => logout()}>Log out</Button>
    </aside>
);

MePanel.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
};

export default MePanel;
