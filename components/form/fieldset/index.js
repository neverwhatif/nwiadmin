import React from 'react';
import PropTypes from 'prop-types';

import FormLegend from 'nwiadmin/components/form/formlegend';

import styles from './styles.scss';

const Fieldset = props => (
    <fieldset className={styles.root}>
        {props.legend && <FormLegend>{props.legend}</FormLegend>}
        {props.children}
    </fieldset>
);

Fieldset.propTypes = {
    children: PropTypes.node.isRequired,
    legend: PropTypes.string,
};

Fieldset.defaultProps = {
    legend: null,
};

export default Fieldset;
