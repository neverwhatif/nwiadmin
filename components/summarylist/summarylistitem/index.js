import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const SummaryListItem = props => (
    <div className={styles.root}>
        <div className={styles.inner}>
            <dt className={styles.term}>{props.term}</dt>
            <dd className={classNames(styles.def, props.def === null ? styles.defIsDisabled : null)}>
                {props.def || '(None)'}
            </dd>
        </div>
    </div>
);

SummaryListItem.propTypes = {
    term: PropTypes.string.isRequired,
    def: PropTypes.string,
};

SummaryListItem.defaultProps = {
    def: null,
};

export default SummaryListItem;
