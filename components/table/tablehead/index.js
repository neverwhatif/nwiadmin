import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Checkbox } from 'nwiadmin/components/form';
import { addPrefixToClassNames } from 'nwiadmin/utility';

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

    renderCell(item) {
        if (item[0] === '$' && item !== '$checkbox') {
            return null;
        }
        return (
            <th key={item} className={styles.cell}>{ item === '$checkbox' ? this.renderCheckbox(item) : item}</th>
        );
    }

    render() {
        const rootClass = classNames(addPrefixToClassNames(styles, 'root', this.props.headClass));

        return (
            <tr className={rootClass}>
                {Object.keys(this.props.data).map(item => this.renderCell(item))}
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
