/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';

import Link from 'nwiadmin/components/link';
import Reference from 'nwiadmin/components/reference';
import Styled from 'nwiadmin/components/styled';

import styles from './styles.scss';

const renderers = {
    link: obj => (<Link to={obj.path}>{obj.title}</Link>),
    reference: obj => (<Reference title={obj.title} reference={obj.reference} link={obj.link} />),
    styled: string => (<Styled data={string} />),
};

const render = item => (
    typeof item === 'object' && item !== null && renderers[item.type]
        ? renderers[item.type](item)
        : renderers.styled(item)
);

const ListItemMeta = props => (
    <ul className={styles.root}>
        {props.data.filter(item => item !== null).map((item, index) => (
            <li key={index} className={styles.item}>
                {render(item)}
            </li>
        ))}
    </ul>
);

ListItemMeta.propTypes = {
    data: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({}),
    ])).isRequired,
};

export default ListItemMeta;
