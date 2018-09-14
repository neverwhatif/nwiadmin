import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import ListItem from './listitem';

import styles from './styles.scss';

const transformData = (transformer, data, columns, functions) => data.map((item, index) => {
    // If there is an '$id' in the data, assume it has already been transformed, and don't transform again
    if (item.$id) {
        return item;
    }

    return Object.entries(transformer(item, index, columns)).reduce((acc, cur) => {
        const [key, value] = cur;
        if (key !== 'null') {
            acc[key] = value;
        }
        acc.$functions = functions;
        return acc;
    }, item.$actions ? { $actions: item.$actions } : {});
});

const List = (props) => {
    if (!props.data.length) {
        return null;
    }

    //const transformed = props.data.map((item, index) => props.transformer(item, index, props.columns));
    const transformed = transformData(props.transformer, props.data, props.columns, props.functions);

    const rootClass = classNames(
        styles.root,
        props.isDisabled ? styles.rootDisabled : null,
    );

    return (
        <ul className={rootClass}>
            {transformed.map(item => (
                <li key={item.id}>
                    <ListItem {...item} shouldInitPreload={props.shouldInitPreload} />
                </li>
            ))}
        </ul>
    );
};

List.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        cta: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            action: PropTypes.func.isRequired,
        })),
    })).isRequired,
    transformer: PropTypes.func,
    isDisabled: PropTypes.bool,
    shouldInitPreload: PropTypes.bool,
    columns: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    })),
};

List.defaultProps = {
    transformer: item => item,
    isDisabled: false,
    shouldInitPreload: false,
    columns: [],
};

export default List;
