import React, { Children, cloneElement, Fragment } from 'react';
import PropTypes from 'prop-types';

import FormLabel from 'nwiadmin/components/form/formlabel';

import styles from './styles.scss';

const fields = [
    'autocomplete',
    'checkbox',
    'connecteddropdown',
    'dateinput',
    'dropdown',
    'fileinput',
    'imageinput',
    'moneyinput',
    'passwordinput',
    'textarea',
    'textinput',
];

const recursiveMap = (children, fn) =>
    Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
            return child;
        }

        if (child.props.children) {
            child = cloneElement(child, {
                children: recursiveMap(child.props.children, fn),
            });
        }

        return fn(child);
    });

const cloneInput = (input, label, name) => {
    if (!input || (input.type && fields.indexOf((input.type.name || '').toLowerCase()) === -1)) {
        return input;
    }

    return cloneElement(input, {
        label,
        name: input.props.name || name,
    });
};

const FormField = ({ children, desc, label, labelClass, name }) => {
    const childrenWithData = recursiveMap(children, (child) => cloneInput(child, label, name));

    return (
        <div className={styles.root}>
            {Boolean(label) && <FormLabel text={label} for={name} extraClasses={labelClass} />}
            {Boolean(desc) && <FormLabel text={desc} for={name} isDesc />}
            <Fragment>{childrenWithData}</Fragment>
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
