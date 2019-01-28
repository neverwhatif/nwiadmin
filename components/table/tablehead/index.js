import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Checkbox } from 'nwiadmin/components/form';
import { addPrefixToClassNames, ucwords } from 'nwiadmin/utility';

import styles from './styles.scss';

class TableHead extends Component {
    renderCheckbox() {
        return (
            <Checkbox
                name="selected"
                onChange={() => this.props.toggleSelectAll()}
                value={this.props.isAllSelected}
            />
        );
    }

    renderCell(item, firstRow) {
        if(item === '$checkbox') {
            return (
                <th key={item} className={classNames(styles.cell, styles.cellCheckbox)}>{this.renderCheckbox(item)}</th>
            );
        }

        if (item[0] === '$') {
            return null;
        }

        const cellClass = classNames(
            styles.cell,
            firstRow && firstRow.type ? styles[`cell${ucwords(firstRow.type)}`] : null,
        );

        return (
            <th key={item} className={cellClass}>{item}</th>
        );
    }

    render() {
        const rootClass = classNames(addPrefixToClassNames(styles, 'root', this.props.headClass));

        return (
            <tr className={rootClass}>
                {Object.entries(this.props.data).map(([item, firstRow]) => this.renderCell(item, firstRow))}
                {this.props.data.$actions && this.renderCell('')}
            </tr>
        );
    }
}

TableHead.propTypes = {
    data: PropTypes.shape({
        $id: PropTypes.number.isRequired,
        $actions: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.shape({}))]),
    }).isRequired,
    toggleSelectAll: PropTypes.func,
    isAllSelected: PropTypes.bool,
    headClass: PropTypes.string,
};

TableHead.defaultProps = {
    toggleSelectAll: () => null,
    isAllSelected: false,
    headClass: null,
};

export default TableHead;
