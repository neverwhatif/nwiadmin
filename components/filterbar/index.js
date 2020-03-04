import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { onAccessibleKeyDown, parseSearch, stringifySearch, ucwords } from 'nwiadmin/utility';
import {
    withOptionalHistory,
    withOptionalLocation,
    defaultWithOptionalHistory,
    defaultWithOptionalLocation,
} from 'nwiadmin/utility/proptypes';

import Button from 'nwiadmin/components/button';
import Modal from 'nwiadmin/components/modal';
import ModalActions from 'nwiadmin/components/modal/modalactions';
import { Dropdown, TextInput } from 'nwiadmin/components/form';
import QuickFilters from 'nwiadmin/components/quickfilters';

import FilterBarCta from './filterbarcta';

import styles from './styles.scss';

const defaultFilter = {
    search: '',
};

const getFiltersFromLocation = (search) => {
    if (!search) {
        return {};
    }

    const parsed = parseSearch(search);

    return {
        ...defaultFilter,
        ...parsed.filter,
    };
};

const getSortFromLocation = (search) => {
    if (!search) {
        return null;
    }

    const parsed = parseSearch(search);

    if (!parsed.sort) {
        return null;
    }

    return Object.entries(parsed.sort).reduce((acc, [key, value]) => `${key}_${value}`, '');
};

const parseSorts = (sorts) =>
    Object.entries(sorts).reduce(
        (acc, [key, value]) => [
            ...acc,
            { id: `${key}_asc`, name: `${value} (Low → High)`, key, direction: 'asc' },
            { id: `${key}_desc`, name: `${value} (High → Low)`, key, direction: 'desc' },
        ],
        []
    );

const FilterBar = ({
    count,
    cta,
    filters,
    hasSearch,
    history,
    isVisible,
    itemName,
    location,
    quickFilters,
    setVisibility,
    sorts,
}) => {
    const [filter, setFilter] = useState(getFiltersFromLocation(location.search));
    const [sort, setSort] = useState(getSortFromLocation(location.search));

    const applyFilters = () => {
        setFilter(getFiltersFromLocation(location.search));
        setSort(getSortFromLocation(location.search));
    };

    const applyHistory = (object) => {
        history.push(`${location.pathname}?${stringifySearch(object)}`);
    };

    const handleChange = (event) => {
        setFilter({ ...filter, [event.target.name]: event.target.value });
    };

    const handleQuickFilterClick = (event) => {
        applyHistory({ filter: event.item });
    };

    const handleSortChange = (event) => {
        const sort = event.item ? { [event.item.key]: event.item.direction } : null;
        applyHistory({ filter, sort });
    };

    const handleSubmit = () => {
        setVisibility(false);
        applyHistory({ filter, sort });
    };

    const handleCancel = () => {
        setVisibility(false);
        applyFilters();
    };

    useEffect(() => {
        applyFilters();
    }, [location.search]);

    const modalTitle = `Filter ${itemName ? `${ucwords(itemName)}s` : ''}`;

    return (
        <Fragment>
            <aside className={styles.root}>
                {hasSearch && (
                    <div className={styles.search}>
                        <TextInput
                            name="search"
                            value={filter.search}
                            onChange={handleChange}
                            placeholder="Search..."
                            onKeyDown={(event) => onAccessibleKeyDown(event, handleSubmit)}
                        />
                        <Button buttonStyle="bordered" onClick={handleSubmit}>
                            Search
                        </Button>
                    </div>
                )}

                <div className={styles.cta}>
                    {quickFilters && (
                        <QuickFilters data={quickFilters} onClick={handleQuickFilterClick} />
                    )}
                    {filters && (
                        <Button onClick={() => setVisibility(true)}>
                            {quickFilters ? 'More ' : ''}Filters...
                        </Button>
                    )}
                    {cta && <FilterBarCta data={cta} location={location} />}
                    {sorts && (
                        <div className={styles.sort}>
                            <Dropdown
                                data={parseSorts(sorts)}
                                onChange={handleSortChange}
                                name="sort"
                                placeholder="Sort by..."
                                value={sort}
                            />
                        </div>
                    )}
                    {Boolean(count) && (
                        <span className={styles.total}>
                            Currently displaying <strong>{count}</strong> result
                            {count === 1 ? '' : 's'}
                        </span>
                    )}
                </div>

                {filters && (
                    <Modal isOpen={isVisible} title={modalTitle} type="filters">
                        {filters({ filter, setFilter: handleChange })}
                        <ModalActions
                            submit={handleSubmit}
                            submitText="Apply"
                            cancel={handleCancel}
                        />
                    </Modal>
                )}
            </aside>
        </Fragment>
    );
};

FilterBar.propTypes = {
    ...withOptionalHistory,
    ...withOptionalLocation,
    filters: PropTypes.func,
    isVisible: PropTypes.bool,
    setVisibility: PropTypes.func,
    itemName: PropTypes.string,
    hasSearch: PropTypes.bool,
    cta: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            action: PropTypes.func.isRequired,
        })
    ),
};

FilterBar.defaultProps = {
    ...defaultWithOptionalHistory,
    ...defaultWithOptionalLocation,
    filters: null,
    isVisible: false,
    setVisibility: () => null,
    itemName: null,
    hasSearch: true,
    cta: null,
};

export default FilterBar;
