import React from 'react';
import PropTypes from 'prop-types';

import Button from 'nwiadmin/components/button';

import styles from './styles.scss';

const FilterBarCta = props => (
    <ul className={styles.root}>
        {props.data.map(item => (
            <li className={styles.item} key={item.label}>
                <Button onClick={e => item.action(e, props)} isDisabled={item.isDisabled || false}>
                    {item.label}
                </Button>
            </li>
        ))}
    </ul>
);

FilterBarCta.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        action: PropTypes.func.isRequired,
    })).isRequired,
};

export default FilterBarCta;
