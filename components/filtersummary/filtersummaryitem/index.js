import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { get } from 'nwiadmin/services/api';
import { formatDate } from 'nwiadmin/utility/formatters';

const getLabel = (key, filterMapItem) => {
    if (key === 'search') {
        return 'Search';
    }
    return filterMapItem && filterMapItem.label ? filterMapItem.label : key;
};

const getFilteredName = (data, key, filterMapItem) => {
    const filtered = data.filter(item => `${item.id}` === `${key}`)[0];

    if (!filtered) {
        return filterMapItem.allOption || '';
    }
    return filtered.name;
};

const getValue = (key, filterMapItem, data) => {
    if (filterMapItem.render) {
        return filterMapItem.render(key);
    }

    // Format date properly

    if(key.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)) {
        return formatDate(key);
    }

    if (Array.isArray(data)) {
        return data.length ? getFilteredName(data, key, filterMapItem) : key;
    }
    return data.name;
};

const getValues = (key, filterMapItem, data) => {
    if(!key.match(/,/)) {
        return getValue(key, filterMapItem, data);
    }
    return key.split(',').map(k => getValue(k, filterMapItem, data)).join(', ');
};

class FilterSummaryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: Boolean(props.filterMapItem.remote),
        };
    }
    componentWillMount() {
        const { filterMapItem: { remote }, value } = this.props;
        this.getRemote(remote, value);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            const { filterMapItem: { remote } } = this.props;
            this.getRemote(remote, nextProps.value);
        }
    }
    getRemote(remote, value) {
        if (!remote) {
            return;
        }

        this.setState({ isLoading: true });

        const alias = typeof remote === 'function' ? remote(value) : remote;

        get(alias)
            .then(response => this.setState({
                data: response.data,
                isLoading: false,
            }));
    }
    render() {
        const { itemKey, filterMapItem } = this.props;

        return (
            <div>
                {getLabel(itemKey, filterMapItem)}:&nbsp;
                {this.state.isLoading ? '...' : getValues(this.props.value, filterMapItem, this.state.data)}
            </div>
        );
    }
}

FilterSummaryItem.propTypes = {
    itemKey: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    filterMapItem: PropTypes.shape({
        remote: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),
    }),
};

FilterSummaryItem.defaultProps = {
    filterMapItem: {},
};

export default FilterSummaryItem;
