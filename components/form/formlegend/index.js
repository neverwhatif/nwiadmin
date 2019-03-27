import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { getElement } from 'nwiadmin/services/app';

import styles from './styles.scss';

const FormLegend = props => {

    const RootElement = getElement('FormLegend') ? getElement('FormLegend') : (children) => (<Fragment>{children}</Fragment>);

    return (
        <legend className={styles.root}>
            {RootElement(props.children, {isOffset: props.isOffset})}
        </legend>
    );
};

FormLegend.propTypes = {
    children: PropTypes.node.isRequired,
    isOffset: PropTypes.bool,
};

FormLegend.defaultProps = {
    isOffset: false,
};

export default FormLegend;
