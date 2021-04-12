import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.scss';

const Hero = props => (
    <article className={styles.root}>
        {Boolean(props.title) && <h2 className={styles.title}>{props.title}</h2>}
        <div className={classNames(styles.content, Boolean(props.title) && styles.contentHasTitle)}>
            {props.children}
        </div>
    </article>
);

Hero.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Hero;
