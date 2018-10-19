import React, { Children, cloneElement, Fragment } from 'react';
import PropTypes from 'prop-types';

import FormLabel from 'nwiadmin/components/form/formlabel';

import styles from './styles.scss';

const cloneInput = (input, props) => {
    if (!input || (input.type && input.type.name === 'FormError')) {
        return input;
    }

    return cloneElement(input, {
        name: props.name,
        label: props.label,
    });
};

const FormField = (props) => {
    const childrenWithData = props.name
        ? Children.map(props.children, child => cloneInput(child, props))
        : props.children;

    return (
        <div className={styles.root}>
            { props.label && <FormLabel text={props.label} for={props.name} extraClasses={props.labelClass} /> }
            { props.desc && <FormLabel text={props.desc} for={props.name} isDesc /> }
            <Fragment>
                { childrenWithData }
            </Fragment>
        </div>
    );
};

FormField.propTypes = {
    children: PropTypes.node.isRequired,
    name: PropTypes.string,
    label: PropTypes.string,
    labelClass: PropTypes.string,
    desc: PropTypes.string,
};

FormField.defaultProps = {
    name: null,
    label: null,
    labelClass: '',
    desc: null,
};

export default FormField;
