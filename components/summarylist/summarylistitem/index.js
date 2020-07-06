import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Styled from 'nwiadmin/components/styled';

import styles from './styles.scss';

const parseDef = (def) => {
    if (!def) {
        return null;
    }
    if (!Array.isArray(def)) {
        return <Styled data={def} />;
    }
    return (
        <span className={styles.value}>
            <span className={styles.valueText}>
                <Styled data={def[0]} />
            </span>
            &nbsp;&nbsp;<a onClick={() => def[2]()}>({def[1]})</a>
        </span>
    );
};

const SummaryListItem = (props) => {
    const def = parseDef(props.def);

    const defClass = classNames(
        styles.def,
        props.isLarge ? styles.defIsLarge : null,
        def === null ? styles.defIsDisabled : null
    );

    return (
        <div className={styles.root}>
            <div
                className={classNames(
                    styles.inner,
                    props.isHighlighted ? styles.innerIsHighlighted : null
                )}
            >
                <dt className={styles.term}>{props.term}</dt>
                <dd className={defClass}>{def || '(None)'}</dd>
            </div>
        </div>
    );
};

SummaryListItem.propTypes = {
    term: PropTypes.string.isRequired,
    def: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number]),
};

SummaryListItem.defaultProps = {
    def: null,
};

export default SummaryListItem;
