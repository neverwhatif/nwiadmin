import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import SummaryListItem from './summarylistitem';

import styles from './styles.scss';

const SummaryList = props => (
    <dl className={classNames(styles.root, props.isWrapped ? styles.rootWrapped : null)}>
        {Object.entries(props.data).map((item, index) => <SummaryListItem key={item[0]} term={item[0]} def={item[1]} isLarge={props.isLarge} isHighlighted={props.highlighted.indexOf(index) > -1} />)}
    </dl>
);

SummaryList.propTypes = {
    data: PropTypes.shape({}).isRequired,
    highlighted: PropTypes.array,
    isWrapped: PropTypes.bool,
};

SummaryList.defaultProps = {
    highlighted: [],
    isWrapped: false,
}

export default SummaryList;
