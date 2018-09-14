import React from 'react';
import PropTypes from 'prop-types';

import Button from 'nwiadmin/components/button';

import styles from './styles.scss';

const CTABar = props => (
    <div className={styles.root}>
        {props.data.map(item => (
            <Button
                key={item.label}
                onClick={item.action}
                buttonStyle={item.style}
            >
                {item.label}
            </Button>
        ))}
    </div>
);

CTABar.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        action: PropTypes.func.isRequired,
    })).isRequired,
};

export default CTABar;
