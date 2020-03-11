import React from 'react';

import Button from 'nwiadmin/components/button';
import FormField from '../formfield';

import styles from './styles.scss';

const ActionField = ({ actionLabel, children, to, onClick, ...props }) => (
    <FormField {...props}>
        <div className={styles.inner}>
            <div className={styles.control}>{children}</div>
            <Button buttonStyle="bordered" to={to} onClick={onClick} isExternal>
                {actionLabel}
            </Button>
        </div>
    </FormField>
);

export default ActionField;
