import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { onAccessibleKeyDown } from 'nwiadmin/utility';

import inputStyles from '../../textinput/styles.scss';
import styles from './styles.scss';

const DropdownInput = props => (
    <div
        className={styles.root}
        role="button"
        onClick={() => props.onClick()}
        onKeyDown={e => onAccessibleKeyDown(e, () => props.onClick())}
        tabIndex={0}
    >
        <div className={classNames(inputStyles.root, props.hasError ? inputStyles.rootError : null)}>
            { props.isLoading ? 'Loading...' : props.text }
        </div>
        <i className={styles.control} />
    </div>
);

DropdownInput.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    isLoading: PropTypes.bool,
};

DropdownInput.defaultProps = {
    onClick: () => null,
    isLoading: false,
};

export default DropdownInput;
