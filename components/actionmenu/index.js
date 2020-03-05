import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { ucwords } from 'nwiadmin/utility';

import Button from 'nwiadmin/components/button';

import styles from './styles.scss';

const ActionMenu = ({ actions, label, isDisabled }) => {
    const node = useRef(null);
    const [isOpen, setOpen] = useState(true);

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
                        <button
                            key={action.label}
                            className={classNames(
                                styles.button,
                                action.variant ? styles[`button${ucwords(action.variant)}`] : null
                            )}
                            onClick={() => handleClick(action.onClick)}
                            disabled={action.isDisabled}
                        >
                            {action.label}
                        </button>
                    ))}
            </div>
        </div>
    );
};

export default ActionMenu;
