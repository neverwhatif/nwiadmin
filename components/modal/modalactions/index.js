import React from 'react';
import PropTypes from 'prop-types';

import Button from 'nwiadmin/components/button';
import { FormSubmit } from 'nwiadmin/components/form';

import styles from './styles.scss';

const ModalActions = ({
    isLoading,
    submit,
    submitText,
    cancel,
    cancelText,
}) => (
    <div className={styles.root}>
        {typeof submit === 'function' && (
            <FormSubmit onClick={() => submit()} isLoading={isLoading}>{submitText}</FormSubmit>
        )}
        <Button buttonStyle="bordered" onClick={() => cancel()}>{cancelText}</Button>
    </div>
);

ModalActions.propTypes = {
    isLoading: PropTypes.bool,
    submit: PropTypes.func,
    submitText: PropTypes.string,
    cancel: PropTypes.func,
    cancelText: PropTypes.string,
};

ModalActions.defaultProps = {
    isLoading: false,
    submit: null,
    submitText: 'Submit',
    cancel: () => null,
    cancelText: 'Cancel',
};

export default ModalActions;
