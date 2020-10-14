import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Checkbox } from 'nwiadmin/components/form';
import { addPrefixToClassNames, ucwords } from 'nwiadmin/utility';

import styles from './styles.scss';

const TableHead = ({ data, headClass, isAllSelected, onSelect }) => {
    const renderCheckbox = () => (
        <Checkbox name="selected" onChange={onSelect} value={isAllSelected} />
    );

    const renderCell = (item, firstRow) => {
        if (item === '$checkbox') {
            return (
                <th key={item} className={classNames(styles.cell, styles.cellCheckbox)}>
                    {renderCheckbox(item)}
                </th>
            );
        }

        if (item[0] === '$') {
            return null;
        }

        const cellClass = classNames(
            styles.cell,
            firstRow && firstRow.type ? styles[`cell${ucwords(firstRow.type)}`] : null
        );

        return (
            <th key={item} className={cellClass}>
                {item}
            </th>
        );
    };

    const rootClass = classNames(addPrefixToClassNames(styles, 'root', headClass));

    return (
        <tr className={rootClass}>
            {Object.entries(data).map(([item, firstRow]) => renderCell(item, firstRow))}
            {data.$actions && renderCell('')}
        </tr>
    );
};

TableHead.propTypes = {
    data: PropTypes.shape({
        $id: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]).isRequired,
        $actions: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.shape({}))]),
    }).isRequired,
    onSelect: PropTypes.func,
    isAllSelected: PropTypes.bool,
    headClass: PropTypes.string,
};

TableHead.defaultProps = {
    onSelect: () => null,
    isAllSelected: false,
    headClass: null,
};

export default TableHead;
