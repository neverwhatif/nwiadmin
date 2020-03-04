import React from 'react';
import PropTypes from 'prop-types';
import { onAccessibleKeyDown, parseSearch } from 'nwiadmin/utility';
import { withLocation } from 'nwiadmin/utility/proptypes';

import FilterSummaryItem from './filtersummaryitem';

import styles from './styles.scss';

const FilterSummary = ({ filterMap, location, resetFilters }) => {
    const parsed = parseSearch(location.search);
    const data = parsed.filter
        ? Object.entries(parsed.filter).filter((item) => Boolean(item[1]))
        : [];

    if (!data.length) {
        return null;
    }

    return (
        <div className={styles.root}>
            <ul className={styles.list}>
                {data.map((item) => (
                    <li className={styles.item} key={item[0]}>
                        <FilterSummaryItem
                            itemKey={item[0]}
                            value={item[1]}
                            filterMapItem={filterMap[item[0]]}
                        />
                    </li>
                ))}
            </ul>
            <span
                className={styles.clear}
                role="button"
                onClick={() => resetFilters()}
                tabIndex={0}
                onKeyDown={(e) => onAccessibleKeyDown(e, () => resetFilters())}
            >
                Clear
            </span>
        </div>
    );
};

FilterSummary.propTypes = {
    ...withLocation,
    resetFilters: PropTypes.func,
    filterMap: PropTypes.shape({}),
};

FilterSummary.defaultProps = {
    resetFilters: () => null,
    filterMap: {},
};

export default FilterSummary;
