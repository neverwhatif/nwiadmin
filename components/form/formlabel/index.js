import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { addPrefixToClassNames } from 'nwiadmin/utility';

import styles from './styles.scss';

const FormLabel = (props) => {
    const rootClass = classNames(
        props.isDesc ? styles.rootIsDesc : null,
        addPrefixToClassNames(styles, 'root', props.extraClasses),
    );

    return props.text === '-' ? (
        <span className={rootClass}>&nbsp;</span>
    ) : (
        <label className={rootClass} htmlFor={props.for}>{props.text}</label>
    );
};

FormLabel.propTypes = {
    text: PropTypes.string.isRequired,
    for: PropTypes.string.isRequired,
    extraClasses: PropTypes.string,
    isDesc: PropTypes.bool,
};

FormLabel.defaultProps = {
    extraClasses: '',
    isDesc: false,
};

export default FormLabel;
