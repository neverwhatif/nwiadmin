import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Link from 'nwiadmin/components/link';

import { logout } from 'nwiadmin/services/auth';

import styles from './styles.scss';

const getInitials = (name) => name.split(' ').map(word => word[0].toUpperCase());

const MePanel = ({ data }) => {
    const node = useRef(null);
    const [isOpen, setOpen] = useState(false);

    const handleClickOutside = (event) => {
        if(node.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleClick = () => {
        setOpen(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, false);

        return (() => {
            document.removeEventListener('click', handleClickOutside);
        });
    }, []);

    return (
        <aside className={styles.root} ref={node}>
            <h2 className={styles.title}>
                {getInitials(data.name ? data.name : `${data.first_name} ${data.last_name}`)}
            </h2>
            <button type="button" className={styles.control} onClick={() => setOpen(true)}>Open</button>
            <div className={classNames(styles.panel, isOpen ? styles.panelOpen : null)}>
                <div className={styles.item}>
                    <Link className={styles.link} to="/preferences" onClick={handleClick}>Preferences</Link>
                </div>
                <div className={styles.item}>
                    <Link className={styles.link} to="/security" onClick={handleClick}>Security</Link>
                </div>
                <div className={styles.item}>
                    <button type="button" className={styles.link} onClick={() => logout()}>Log out</button>
                </div>
            </div>
        </aside>
    );
}

MePanel.propTypes = {
    data: PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        name: PropTypes.string,
    }).isRequired,
};

export default MePanel;
