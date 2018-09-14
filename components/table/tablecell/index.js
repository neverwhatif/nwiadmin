import React, { Fragment } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { addPrefixToClassNames } from 'nwiadmin/utility';

import Button from 'nwiadmin/components/button';
import Checkbox from 'nwiadmin/components/form/checkbox';
import Link from 'nwiadmin/components/link';
import Reference from 'nwiadmin/components/reference';

import styles from './styles.scss';

const renderAction = (item, row, functions) => {
    const label = typeof item.label === 'function' ? item.label(row) : item.label;
    const isDisabled = typeof item.isDisabled === 'function' ? item.isDisabled(row) : item.isDisabled;

    return (
        <Button
            key={label}
            onClick={() => item.action({ row, ...functions })}
            isDisabled={isDisabled}
        >
            {label}
        </Button>
    );
};

const renderers = {
    default: value => (typeof value === 'object' && value !== null ? JSON.stringify(value) : value),
    link: value => (
        <Link to={value.path} isExternal={value.isExternal}>{value.title}</Link>
    ),
    reference: value => (
        <Reference title={value.title} reference={value.reference} link={value.link} />
    ),
    details: value => (
        <Fragment>
            <p>{value.title}</p>
            <p><small className={styles.extra}>{value.details}</small></p>
        </Fragment>
    ),
    checkbox: value => (
        <Checkbox
            readonly
            name={`selected.${value.id}`}
            value={value.isSelected}
        />
    ),
    actions: (value) => {
        const { row, functions } = value;
        const actions = typeof row.$actions === 'function' ? row.$actions(row) : row.$actions;

        if (!Array.isArray(actions)) {
            return null;
        }

        return (
            <Fragment>
                {actions.map(item => renderAction(item, row, functions))}
            </Fragment>
        );
    },
};

const TableCell = ({ value }) => (
    <td className={classNames(addPrefixToClassNames(styles, 'root', value && value.type ? value.type : null))}>
        {value && value.type && renderers[value.type] ? renderers[value.type](value) : renderers.default(value)}
    </td>
);

TableCell.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.shape({
            row: PropTypes.shape({}),
            functions: PropTypes.objectOf(PropTypes.func),
        }),
    ]),
};

TableCell.defaultProps = {
    value: null,
};

export default TableCell;
