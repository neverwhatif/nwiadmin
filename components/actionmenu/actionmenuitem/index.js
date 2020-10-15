import React from 'react';
import classNames from 'classnames';

import { ucwords } from 'nwiadmin/utility';

import styles from './styles.scss';

const ActionMenuItem = ({ action, onClick }) => (
    <button
        className={classNames(
            styles.root,
            action.variant ? styles[`root${ucwords(action.variant)}`] : null
        )}
        onClick={() => onClick(action.onClick)}
        disabled={action.isDisabled}
    >
        {action.label}
    </button>
);

export default ActionMenuItem;
