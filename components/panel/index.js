import React from 'react';
import PropTypes from 'prop-types';

import FormLegend from 'nwiadmin/components/form/formlegend';

import styles from './styles.scss';

const Panel = (props) => (
    <section className={styles.root}>
        {props.title && <h2 className={styles.title}>{props.title}</h2>}
        {props.children}
    </section>
);

Panel.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
};

Panel.defaultProps = {
    title: null,
};

export default Panel;
