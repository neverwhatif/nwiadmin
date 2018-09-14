import React from 'react';
import PropTypes from 'prop-types';

import Flag from 'nwiadmin/components/flag';

import styles from './styles.scss';

const FormLegend = props => (
    <legend className={styles.root}>
        <Flag isOffset={props.isOffset}>{props.children}</Flag>
    </legend>
);

FormLegend.propTypes = {
    children: PropTypes.node.isRequired,
    isOffset: PropTypes.bool,
};

FormLegend.defaultProps = {
    isOffset: false,
};

export default FormLegend;
