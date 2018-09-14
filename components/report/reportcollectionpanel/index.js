import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Flag from 'nwiadmin/components/flag';

import styles from './styles.scss';

const ReportCollectionPanel = props => (
    <article className={classNames(styles.root, props.isDisabled ? styles.rootIsDisabled : null)}>
        <div className={styles.panel}>
            {props.title && (
                <h2 className={styles.title}>
                    <Flag>{props.title}</Flag>
                </h2>
            )}
            {props.children}
        </div>
    </article>
);

ReportCollectionPanel.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    isDisabled: PropTypes.bool,
};

ReportCollectionPanel.defaultProps = {
    title: null,
    isDisabled: false,
};

export default ReportCollectionPanel;
