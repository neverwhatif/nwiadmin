import React from 'react';

import FormField from '../formfield';

import styles from './styles.scss';

const ActionField = ({ children, to, onClick, ...props }) => (
    <FormField {...props}>
        <div>{children}</div>
    </FormField>
);

export default ActionField;
