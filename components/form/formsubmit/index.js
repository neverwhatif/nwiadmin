import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Button from 'nwiadmin/components/button';

import styles from './styles.scss';

const FormSubmit = (props) => {
    const { isLoading, ...otherProps } = props;
    const buttonStyle = isLoading ? { color: 'transparent' } : null;

    const rootClass = classNames(styles.root, props.buttonStyle === 'block' ? styles.rootBlock : null);

    return (
        <div className={rootClass}>
            { isLoading && <div className={styles.spinner}><i /><i /><i /></div>}
            <Button {...otherProps} isDisabled={isLoading} style={buttonStyle} />
        </div>
    );
};

FormSubmit.propTypes = {
    isLoading: PropTypes.bool,
    buttonStyle: PropTypes.string,
};

FormSubmit.defaultProps = {
    isLoading: false,
    buttonStyle: null,
};

export default FormSubmit;
