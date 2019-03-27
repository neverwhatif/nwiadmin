import React from 'react';
import PropTypes from 'prop-types';

import Flag from 'nwiadmin/components/flag';

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
