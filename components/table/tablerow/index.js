import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TableCell from '../tablecell';

import styles from './styles.scss';

const TableRow = ({
    data,
    functions,
    isOdd,
    isDisabled,
    isSelected,
    toggleSelect,
}) => {
    const isSelectable = Boolean(data.$checkbox);

    const rootClass = classNames(
        styles.root,
        isOdd ? styles.rootOdd : null,
        isDisabled ? styles.rootDisabled : null,
        isSelectable ? styles.rootSelectable : null,
        isSelected ? styles.rootSelected : null,
    );

    const onClick = isSelectable ? () => toggleSelect(data.$checkbox) : () => null;

    const cells = Object.entries(data).filter(item => item[0] !== '' && item[0][0] !== '$');

    return (
        <tr className={rootClass} onClick={onClick}>
            {data.$checkbox && <TableCell value={{ type: 'checkbox', id: data.$checkbox, isSelected }} />}
            {cells.map(([key, value]) => (
                <TableCell key={key} value={value} />
            ))}
            {data.$actions && <TableCell value={{ type: 'actions', row: data, functions }} />}
        </tr>
    );
};

TableRow.propTypes = {
    data: PropTypes.shape({
        $id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        $checkbox: PropTypes.number,
    }).isRequired,
    functions: PropTypes.objectOf(PropTypes.func),
    isOdd: PropTypes.bool,
    isSelected: PropTypes.bool,
    toggleSelect: PropTypes.func,
};

TableRow.defaultProps = {
    functions: null,
    isOdd: false,
    isSelected: false,
    toggleSelect: () => null,
};

export default TableRow;
