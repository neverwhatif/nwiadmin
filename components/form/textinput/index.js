import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const TextInput = (props) => {
    const {
        component,
        name,
        value,
        hasError,
        lpIgnore,
        ...otherProps
    } = props;
    const inputValue = value === null ? '' : value;

    const rootClass = classNames(styles.root, hasError ? styles.rootError : null);

    const parsedId = name.replace(/\./g, '-');
    const Component = component || 'input';

    return (
        <Component
            data-lpignore={lpIgnore}
            className={rootClass}
            name={name}
            id={parsedId}
            value={inputValue}
            {...otherProps}
        />
    );
};

TextInput.propTypes = {
    component: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    hasError: PropTypes.bool,
    lpIgnore: PropTypes.bool,
};

TextInput.defaultProps = {
    component: null,
    onChange: () => null,
    name: '',
    placeholder: null,
    readOnly: false,
    value: '',
    hasError: false,
    lpIgnore: true,
};

export default TextInput;
