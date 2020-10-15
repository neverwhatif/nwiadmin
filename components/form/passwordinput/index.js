import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';

import TextInput from '../textinput';

import styles from './styles.scss';

const PasswordInput = ({ value, onChange, ...otherProps }) => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => setVisible(!visible);

    return (
        <div className={styles.root}>
            <TextInput
                {...otherProps}
                value={value}
                onChange={onChange}
                type={visible ? 'text' : 'password'}
                autoComplete="off"
            />
            <button
                className={styles.control}
                type="button"
                onClick={toggleVisible}
                style={{ display: value ? 'block' : 'none' }}
            >
                {visible ? 'Hide password' : 'Show password'}
            </button>
        </div>
    );
};

PasswordInput.displayName = 'PasswordInput';

PasswordInput.propTypes = {
    onChange: PropTypes.func,
};

PasswordInput.defaultProps = {
    onChange: () => null,
};

export default PasswordInput;
