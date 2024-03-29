import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { toggleArrayItem } from 'nwiadmin/utility';

import TableHead from './tablehead';
import TableRow from './tablerow';

import styles from './styles.scss';

const transformDataItem = (transformer, item, index, columns, functions) => {
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
}

const transformData = (transformer, data, columns, totals, functions) => {
    const transformed = data.map((item, index) => transformDataItem(transformer, item, index, columns, functions));

    if(totals) {
        transformed.push(columns.reduce((acc, cur, index) => {
            const transformedItem = typeof totals[cur.key] !== 'undefined'
                ? transformer({ [cur.key]: totals[cur.key] }, index, columns)
                : {};

            acc[cur.title] = index === 0
                ? 'Totals'
                : (transformedItem[cur.title] ? transformedItem[cur.title] : '');
            return acc;
        }, { $id: 0 }));
    }

    return transformed;
};

class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSelectable: false,
            selected: props.initialSelected || [],
        };
    }

    componentWillMount() {
        const transformed = this.getTransformed();

        const isSelectable = Boolean(transformed[0] && transformed[0].$checkbox);
        this.setState({ isSelectable });

        if (isSelectable) {
            PubSub.publish('@currentTable/SET_SELECTED', this.props.initialSelected || []);
        }
    }

    getTransformed() {
        const {
            data,
            columns,
            totals,
            transformer,
            functions,
        } = this.props;
        return transformData(transformer, data, columns, totals, functions);
    }

    isAllSelected() {
        const transformed = this.getTransformed().filter(item => !item.$isDisabled);
        return this.state.selected.length === transformed.length;
    }

    toggleSelect(id) {
        const selected = toggleArrayItem(this.state.selected, id);
        this.setState({ selected });

        const transformed = this.getTransformed();

        if (this.state.isSelectable) {
            PubSub.publish(
                '@currentTable/SET_SELECTED',
                transformed.filter(item => selected.indexOf(item.$id) > -1 && item.$id > 0),
            );
        }
    }

    toggleSelectAll() {
        const transformed = this.getTransformed();

        const selected = this.isAllSelected() ? [] : transformed.map(item => item.$isDisabled ? null : item.$id).filter(item => item !== null);
        this.setState({ selected });

        if (this.state.isSelectable) {
            PubSub.publish(
                '@currentTable/SET_SELECTED',
                transformed.filter(item => selected.indexOf(item.$id) > -1 && item.$id > 0),
            );
        }
    }

    render() {
        if (!this.props.data.length) {
            return null;
        }

        const rootClass = classNames(
            styles.root,
            this.props.hasHead ? styles.rootHasHead : null,
            this.props.isDisabled ? styles.rootDisabled : null,
        );

        const transformed = this.getTransformed();

        return (
            <table className={rootClass}>
                {this.props.hasHead && (
                    <thead>
                        <TableHead
                            headClass={this.props.headClass}
                            data={transformed[0]}
                            isAllSelected={this.isAllSelected()}
                            toggleSelectAll={() => this.toggleSelectAll()}
                        />
                    </thead>
                )}
                <tbody>
                    {transformed.map((item, index) => (
                        <TableRow
                            key={index}
                            isOdd={index % 2 === 1}
                            data={item}
                            functions={this.props.functions}
                            isDisabled={item.$isDisabled}
                            isSelected={this.state.selected.indexOf(item.$id) > -1}
                            toggleSelect={id => this.toggleSelect(id)}
                        />
                    ))}
                </tbody>
            </table>
        );
    }
}

Table.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
    })).isRequired,
    transformer: PropTypes.func,
    hasHead: PropTypes.bool,
    headClass: PropTypes.string,
    isDisabled: PropTypes.bool,
    columns: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    })),
    functions: PropTypes.objectOf(PropTypes.func),
};

Table.defaultProps = {
    transformer: item => item,
    hasHead: true,
    headClass: null,
    isDisabled: false,
    columns: [],
    functions: null,
};

export default Table;
