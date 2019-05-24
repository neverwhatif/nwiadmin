import React, { Component, Fragment } from 'react';
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
    const parsed = parseSearch(search);

    return {
        ...defaultFilter,
        ...parsed.filter,
    };
};

const getSortFromLocation = (search) => {
    const parsed = parseSearch(search);

    if(!parsed.sort) {
        return null;
    }

    return Object.entries(parsed.sort).reduce((acc, [key, value]) => `${key}_${value}`, '');
};

const parseSorts = (sorts) => Object.entries(sorts).reduce((acc, [key, value]) => ([
    ...acc,
    { id: `${key}_asc`, name: `${value} (Low → High)`, key, direction: 'asc' },
    { id: `${key}_desc`, name: `${value} (High → Low)`, key, direction: 'desc' },
]), []);

class FilterBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: props.location.search ? getFiltersFromLocation(props.location.search) : {},
            sort: props.location.search ? getSortFromLocation(props.location.search) : {},
        };
    }

    componentDidUpdate(prevProps) {
        const { search } = this.props.location;

        if (search !== prevProps.location.search) {
            this.setFilters(search);
        }
    }

    setFilter(e) {
        const { target: { name, value } } = e;
        this.setState({
            filter: {
                ...this.state.filter,
                [name]: value,
            },
        });
    }

    setFilters(search) {
        this.setState({
            filter: getFiltersFromLocation(search),
            sort: getSortFromLocation(search),
        });
    }

    submitFilters() {
        const { pathname } = this.props.location;
        const search = {
            filter: { ...this.state.filter },
            sort: { ...this.state.sort },
        };

        this.props.setVisibility(false);
        this.props.history.push(`${pathname}?${stringifySearch(search)}`);
    }

    setQuickFilter(filter) {
        const { pathname } = this.props.location;
        this.props.history.push(`${pathname}?${stringifySearch({ filter })}`);
    }

    setSort(event) {
        const { pathname } = this.props.location;
        const { filter } = this.state;
        const { item } = event;

        const sort = item ? { [item.key]: item.direction } : null;
        this.props.history.push(`${pathname}?${stringifySearch({ filter, sort })}`);
    }

    render() {
        const {
            cta,
            filters,
            count,
            quickFilters,
            itemName,
            hasSearch,
            sorts,
        } = this.props;

        const modalTitle = `Filter ${itemName ? `${ucwords(itemName)}s` : ''}`;

        // TODO: Finish sorting

        return (
            <Fragment>
                <aside className={styles.root}>
                    {hasSearch && (
                        <div className={styles.search}>
                            <TextInput
                                name="search"
                                value={this.state.filter.search}
                                onChange={e => this.setFilter(e)}
                                placeholder="Search..."
                                onKeyDown={e => onAccessibleKeyDown(e, () => this.submitFilters())}
                            />
                            <Button buttonStyle="bordered" onClick={() => this.submitFilters()}>Search</Button>
                        </div>
                    )}

                    <div className={styles.cta}>
                        {quickFilters && <QuickFilters data={quickFilters} setFilter={e => this.setQuickFilter(e)} />}
                        {filters && <Button onClick={() => this.props.setVisibility()}>{quickFilters ? 'More ' : ''}Filters...</Button>}
                        {cta && <FilterBarCta data={cta} location={this.props.location} />}
                        {sorts && (
                            <div className={styles.sort}>
                                <Dropdown data={parseSorts(sorts)} onChange={(event) => this.setSort(event)} name="sort" placeholder="Sort by..." value={this.state.sort} />
                            </div>
                        )}
                        {Boolean(count) && <span className={styles.total}>Currently displaying <strong>{count}</strong> result{count === 1 ? '' : 's'}</span>}
                    </div>

                    {filters && (
                        <Modal isOpen={this.props.isVisible} title={modalTitle} type="filters">
                            {filters({
                                filter: this.state.filter,
                                setFilter: e => this.setFilter(e),
                            })}
                            <ModalActions
                                submit={() => this.submitFilters()}
                                submitText="Apply"
                                cancel={() => this.props.setVisibility(false)}
                            />
                        </Modal>
                    )}
                </aside>
            </Fragment>
        );
    }
}

FilterBar.propTypes = {
    ...withOptionalHistory,
    ...withOptionalLocation,
    filters: PropTypes.func,
    isVisible: PropTypes.bool,
    setVisibility: PropTypes.func,
    itemName: PropTypes.string,
    hasSearch: PropTypes.bool,
    cta: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        action: PropTypes.func.isRequired,
    })),
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
