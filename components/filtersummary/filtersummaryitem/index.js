import React, { useEffect, useState } from 'react';
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
    const filtered = data.filter((item) => `${item.id}` === `${key}`)[0];

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

    if (key.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)) {
        return formatDate(key);
    }

    if (Array.isArray(data)) {
        return data.length ? getFilteredName(data, key, filterMapItem) : key;
    }
    return data.name;
};

const getValues = (key, filterMapItem, data) => {
    if (!key.match(/,/)) {
        return getValue(key, filterMapItem, data);
    }
    return key
        .split(',')
        .map((k) => getValue(k, filterMapItem, data))
        .join(', ');
};

const FilterSummaryItem = ({ filterMapItem, itemKey, value }) => {
    const { remote } = filterMapItem;

    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(Boolean(remote));

    const getData = async () => {
        if (!remote) {
            return;
        }

        setLoading(true);

        const alias = typeof remote === 'function' ? remote(value) : remote;
        const response = await get(alias);

        const transformer = filterMapItem.transformer ? filterMapItem.transformer : (item) => item;

        setData((response.data || []).map(item => transformer(item)));
        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, [value]);

    return (
        <div>
            {getLabel(itemKey, filterMapItem)}:&nbsp;
            {isLoading ? '...' : getValues(value, filterMapItem, data)}
        </div>
    );
};

FilterSummaryItem.propTypes = {
    itemKey: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    filterMapItem: PropTypes.shape({
        remote: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    }),
};

FilterSummaryItem.defaultProps = {
    filterMapItem: {},
};

export default FilterSummaryItem;
