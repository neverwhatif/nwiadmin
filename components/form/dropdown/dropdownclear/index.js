import React from 'react';
import PropTypes from 'prop-types';

import { onAccessibleKeyDown } from 'nwiadmin/utility';

import styles from './styles.scss';

const DropdownClear = props => (
    <span
        className={styles.root}
        role="button"
        onClick={() => props.onClick()}
        tabIndex={0}
        onKeyDown={e => onAccessibleKeyDown(e, () => props.onClick())}
    >
        Clear
    </span>
);

DropdownClear.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default DropdownClear;
