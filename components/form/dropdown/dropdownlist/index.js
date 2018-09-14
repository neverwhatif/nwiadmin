/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { onAccessibleKeyDown } from 'nwiadmin/utility';

import styles from './styles.scss';

const DropdownList = (props) => {
    if (!props.data.length) {
        return null;
    }

    const rootClass = classNames(
        styles.root,
        props.isOpen ? styles.rootIsOpen : null,
    );

    return (
        <ul className={rootClass}>
            {props.data.map(item => (
                <li
                    className={styles.item}
                    key={item.id}
                    onClick={() => props.onItemClick(item)}
                    onKeyDown={e => onAccessibleKeyDown(e, () => props.onItemClick(item))}
                >
                    {item.name}
                </li>
            ))}
        </ul>
    );
};

DropdownList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })).isRequired,
    isOpen: PropTypes.bool,
};

DropdownList.defaultProps = {
    isOpen: false,
};

export default DropdownList;
