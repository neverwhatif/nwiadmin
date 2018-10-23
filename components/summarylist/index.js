import React from 'react';
import PropTypes from 'prop-types';

import SummaryListItem from './summarylistitem';

import styles from './styles.scss';

const SummaryList = props => (
    <dl className={styles.root}>
        {Object.entries(props.data).map(item => <SummaryListItem key={item[0]} term={item[0]} def={item[1]} isLarge={props.isLarge} />)}
    </dl>
);

SummaryList.propTypes = {
    data: PropTypes.shape({}).isRequired,
};

export default SummaryList;
