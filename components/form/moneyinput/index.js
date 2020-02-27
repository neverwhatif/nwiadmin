import React from 'react';

import TextInput from '../textinput';

import styles from './styles.scss';

const MoneyInput = (props) => (
    <div className={styles.root}>
        <TextInput {...props} className={styles.input} />
    </div>
);

export default MoneyInput;
