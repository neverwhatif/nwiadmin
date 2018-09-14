import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { toggleArrayItem } from 'nwiadmin/utility';

import TableHead from './tablehead';
import TableRow from './tablerow';

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

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelectable: false,
            selected: [],
        };
    }

    componentWillMount() {
        const transformed = this.getTransformed();

        const isSelectable = transformed[0] && transformed[0].$checkbox;
        this.setState({ isSelectable });

        if (isSelectable) {
            PubSub.publish('@currentTable/SET_SELECTED', []);
        }
    }

    getTransformed() {
        const {
            data,
            columns,
            transformer,
            functions,
        } = this.props;
        return transformData(transformer, data, columns, functions);
    }

    isAllSelected() {
        const transformed = this.getTransformed();
        return this.state.selected.length === transformed.length;
    }

    toggleSelect(id) {
        const selected = toggleArrayItem(this.state.selected, id);
        this.setState({ selected });

        const transformed = this.getTransformed();

        if (this.state.isSelectable) {
            PubSub.publish(
                '@currentTable/SET_SELECTED',
                transformed.filter(item => selected.indexOf(item.$id) > -1),
            );
        }
    }

    toggleSelectAll() {
        const transformed = this.getTransformed();

        const selected = this.isAllSelected() ? [] : transformed.map(item => item.$id);
        this.setState({ selected });

        if (this.state.isSelectable) {
            PubSub.publish(
                '@currentTable/SET_SELECTED',
                transformed.filter(item => selected.indexOf(item.$id) > -1),
            );
        }
    }

    render() {
        if (!this.props.data.length) {
            return null;
        }

        const rootClass = classNames(
            styles.root,
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
                            key={item.$id}
                            isOdd={index % 2 === 1}
                            data={item}
                            functions={this.props.functions}
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
