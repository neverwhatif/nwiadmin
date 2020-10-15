import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import Allow from 'nwiadmin/components/allow';
import Button from 'nwiadmin/components/button';

import ActionMenuItem from './actionmenuitem';

import styles from './styles.scss';

const ActionMenu = ({ actions, label, isDisabled }) => {
    const node = useRef(null);
    const [isOpen, setOpen] = useState(false);

    const toggleOpen = () => setOpen(!isOpen);

    const handleClickOutside = (event) => {
        if (node.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleClick = (onClick) => {
        onClick();
        setOpen(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, false);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.root} ref={node}>
            <Button buttonStyle="bordered" isDisabled={isDisabled} onClick={toggleOpen}>
                {label || 'More Actions...'}
            </Button>
            <div className={classNames(styles.panel, isOpen ? styles.panelOpen : null)}>
                {actions
                    .filter((action) => action)
                    .map((action) => (
                        action.permission ? <Allow key={action.label} permission={action.permission}><ActionMenuItem action={action} onClick={handleClick} /></Allow> : <ActionMenuItem key={action.label} action={action} onClick={handleClick} />
                    ))}
            </div>
        </div>
    );
};

export default ActionMenu;
