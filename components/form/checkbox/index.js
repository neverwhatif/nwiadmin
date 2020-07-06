import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.scss';

const Checkbox = (props) => {
    const { hasError, labelText, name, isDisabled, readonly, value, ...otherProps } = props;

    const iconClass = classNames(
        styles.icon,
        isDisabled ? styles.iconIsDisabled : null,
        readonly || isDisabled ? styles.readonly : null
    );
    const labelClass = classNames(
        styles.label,
        isDisabled ? styles.iconIsDisabled : null,
        readonly || isDisabled ? styles.readonly : null
    );

    return (
        <div className={styles.root}>
            <input
                type="checkbox"
                className={styles.control}
                name={name}
                id={name}
                value="1"
                checked={value}
                disabled={isDisabled}
                {...otherProps}
            />
            <label className={iconClass} htmlFor={props.name} />
            {(props.children || labelText) && (
                <label className={labelClass} htmlFor={props.name}>
                    {props.children || labelText}
                </label>
            )}
        </div>
    );
};

Checkbox.propTypes = {
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    hasError: PropTypes.bool,
    labelText: PropTypes.string,
    isDisabled: PropTypes.bool,
    readonly: PropTypes.bool,
    children: PropTypes.node,
};

Checkbox.defaultProps = {
    value: false,
    hasError: false,
    labelText: null,
    isDisabled: false,
    readonly: false,
    children: null,
};

export default Checkbox;
