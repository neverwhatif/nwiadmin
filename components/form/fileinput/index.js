import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const FileInput = ({ name, onChange }) => {
    return (
        <div className={styles.root}>
            <input className={styles.input} type="file" name={name} onChange={onChange} />
            <span className={styles.label}></span>
        </div>
    );
};

FileInput.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
};

FileInput.defaultProps = {
    onChange: () => null,
};

export default FileInput;
