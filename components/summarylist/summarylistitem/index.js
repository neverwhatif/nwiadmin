import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const parseDef = (def) => {
    if(!def) {
        return '(None)';
    }
    if(!Array.isArray(def)) {
        return def;
    }
    return (
        <span>
            <span>{def[0]}</span>
            &nbsp;&nbsp;<a onClick={() => def[2]()}>({def[1]})</a>
        </span>
    );
};

const SummaryListItem = props => (
    <div className={styles.root}>
        <div className={styles.inner}>
            <dt className={styles.term}>{props.term}</dt>
            <dd className={classNames(styles.def, props.def === null ? styles.defIsDisabled : null)}>
                {parseDef(props.def)}
            </dd>
        </div>
    </div>
);

SummaryListItem.propTypes = {
    term: PropTypes.string.isRequired,
    def: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};

SummaryListItem.defaultProps = {
    def: null,
};

export default SummaryListItem;
