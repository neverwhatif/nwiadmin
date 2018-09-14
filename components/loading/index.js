/* eslint-disable max-len */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.scss';

const Loading = props => (
    <div className={classNames(styles.root, props.isFullscreen ? styles.rootFullscreen : null)}>
        <div className={styles.icon} />
    </div>
);

Loading.propTypes = {
    isFullscreen: PropTypes.bool,
};

Loading.defaultProps = {
    isFullscreen: false,
};

export default Loading;
