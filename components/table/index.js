import React, { Component, useEffect, useState } from 'react';
import PubSub from 'pubsub-js';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { toggleArrayItem } from 'nwiadmin/utility';

import TableHead from './tablehead';
import TableRow from './tablerow';

import styles from './styles.scss';

const transformDataItem = (transformer, item, index, columns, functions, actions) => {
    // If there is an '$id' in the data, assume it has already been transformed, and don't transform again
    if (item.$id) {
        return item;
    }

    return Object.entries(transformer(item, index, columns)).reduce(
        (acc, cur) => {
            const [key, value] = cur;
            if (key !== 'null') {
                acc[key] = value;
            }
            acc.$functions = functions;
            return acc;
        },
        actions ? { $actions: actions } : {}
    );
};

const transformData = (transformer, data, columns, totals, functions, actions) => {
    const transformed = data.map((item, index) =>
        transformDataItem(transformer, item, index, columns, functions, actions)
    );

    if (totals) {
        transformed.push(
            columns.reduce(
                (acc, cur, index) => {
                    const transformedItem =
                        typeof totals[cur.key] !== 'undefined'
                            ? transformer({ [cur.key]: totals[cur.key] }, index, columns)
                            : {};

                    acc[cur.title] =
                        index === 0
                            ? 'Totals'
                            : transformedItem[cur.title]
                            ? transformedItem[cur.title]
                            : '';
                    return acc;
                },
                { $id: 0 }
            )
        );
    }

    return transformed;
};

const Table = ({
    data,
    columns,
    actions,
    functions,
    headClass,
    initialSelected,
    totals,
    transformer,
    hasHead,
    isDisabled,
    onSelect,
}) => {
    const [isSelectable, setSelectable] = useState(false);
    const [selected, setSelected] = useState(initialSelected);

    const getTransformed = () =>
        transformData(transformer, data, columns, totals, functions, actions);

    const isAllSelected = () => {
        const transformed = getTransformed().filter((item) => !item.$isDisabled);

        console.log(selected, transformed);
        return selected.length === transformed.length;
    };

    const handleSelect = (id) => {
        const sel = toggleArrayItem(selected, id);
        setSelected(sel);

        const transformed = getTransformed();

        if (isSelectable) {
            const newTransformed = transformed.filter(
                (item) => sel.indexOf(item.$id) > -1 && item.$id > 0
            );

            PubSub.publish('@currentTable/SET_SELECTED', newTransformed);
            onSelect(newTransformed);
        }
    };

    const handleSelectAll = () => {
        const transformed = getTransformed();
        const sel = isAllSelected()
            ? []
            : transformed
                  .map((item) => (item.$isDisabled ? null : item.$id))
                  .filter((item) => item !== null);

        setSelected(sel);

        if (isSelectable) {
            const newTransformed = transformed.filter(
                (item) => sel.indexOf(item.$id) > -1 && item.$id > 0
            );

            PubSub.publish('@currentTable/SET_SELECTED', newTransformed);
            onSelect(newTransformed);
        }
    };

    useEffect(() => {
        const transformed = getTransformed();

        setSelectable(Boolean(transformed[0] && transformed[0].$checkbox));

        if (isSelectable) {
            PubSub.publish('@currentTable/SET_SELECTED', initialSelected || []);
            onSelect(initialSelected || []);
        }
    }, []);

    if (!data.length) {
        return null;
    }

    const rootClass = classNames(
        styles.root,
        hasHead ? styles.rootHasHead : null,
        isDisabled ? styles.rootDisabled : null
    );

    const transformed = getTransformed();

    return (
        <table className={rootClass}>
            {hasHead && (
                <thead>
                    <TableHead
                        headClass={headClass}
                        data={transformed[0]}
                        isAllSelected={isAllSelected()}
                        onSelect={handleSelectAll}
                    />
                </thead>
            )}
            <tbody>
                {transformed.map((item, index) => (
                    <TableRow
                        key={index}
                        isOdd={index % 2 === 1}
                        data={item}
                        functions={functions}
                        isDisabled={item.$isDisabled}
                        isSelected={selected.indexOf(item.$id) > -1}
                        onSelect={handleSelect}
                    />
                ))}
            </tbody>
        </table>
    );
};

Table.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
        })
    ).isRequired,
    transformer: PropTypes.func,
    hasHead: PropTypes.bool,
    headClass: PropTypes.string,
    isDisabled: PropTypes.bool,
    initialSelected: PropTypes.array,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
        })
    ),
    functions: PropTypes.objectOf(PropTypes.func),
    onSelect: PropTypes.func,
};

Table.defaultProps = {
    transformer: (item) => item,
    hasHead: true,
    headClass: null,
    isDisabled: false,
    initialSelected: [],
    columns: [],
    functions: null,
    onSelect: () => null,
};

export default Table;
