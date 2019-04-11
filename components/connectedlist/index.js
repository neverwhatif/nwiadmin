import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withConnected, withHistory, withLocation, defaultWithConnected } from 'nwiadmin/utility/proptypes';

import { withRouter } from 'react-router';
import { checkAuthResponse } from 'nwiadmin/services/auth';

import EmptyList from 'nwiadmin/components/emptylist';
import FilterBar from 'nwiadmin/components/filterbar';
import FilterSummary from 'nwiadmin/components/filtersummary';
import List from 'nwiadmin/components/list';
import Loading from 'nwiadmin/components/loading';
import Pagination from 'nwiadmin/components/pagination';
import ErrorMessage from 'nwiadmin/components/errormessage';
import ErrorBoundary from 'nwiadmin/components/errorboundary';

import { get } from 'nwiadmin/services/api';
import { parseRemote, parseSearch } from 'nwiadmin/utility';

const defaultState = {
    isFiltersVisible: false,
    dataError: null,
    // Some data (ie reports) comes down with columns information, which can be passed to the transformer
    columns: [],
    data: null,
    totals: null,
    search: '',
    meta: null,
};

export class ConnectedListComponent extends Component {
    constructor(props) {
        super(props);

        const isDataLoading = !(this.props.shouldOnlyUpdateWithFilters && !this.hasFilters());

        this.state = {
            isDataLoading,
            ...defaultState,
        };

        this.resetFilters = this.resetFilters.bind(this);
        this.setFilterVisibility = this.setFilterVisibility.bind(this);

        this.updateData = this.updateData.bind(this);
        this.updateRow = this.updateRow.bind(this);
    }

    componentWillMount() {
        if (this.props.shouldOnlyUpdateWithFilters && !this.hasFilters()) {
            this.setState(defaultState);
            return;
        }
        this.getData(this.props.location.search);
    }

    componentDidMount() {
        this.props.setFunctions({
            updateData: this.updateData,
            updateRow: this.updateRow,
            reloadData: () => this.getData(this.state.search),
        });
    }

    componentWillReceiveProps(newProps) {
        const { search } = newProps.location;

        if (search === this.state.search) {
            return;
        }

        if (this.props.shouldOnlyUpdateWithFilters && !this.hasFilters(search)) {
            this.setState(defaultState);
            return;
        }

        this.getData(search);
    }

    getColumns(response) {
        if (response.columns) {
            return response.columns;
        }
        return this.props.columns || [];
    }

    getData(search) {
        this.setState({
            search,
            isDataLoading: true,
        });

        const parsedRemote = parseRemote(this.props.remote, search);

        get(parsedRemote.alias, parsedRemote.params)
            .then(response => this.setState({
                columns: this.getColumns(response),
                data: this.props.transformData(response.data),
                meta: response.meta,
                totals: response.totals,
                isDataLoading: false,
            }))
            .catch((dataError) => {
                checkAuthResponse(dataError, () => {
                    this.setState({ dataError });
                });
            });
    }

    getEmptyList() {
        // Scenarios:
        // The list only works with filters, and there are no filters
        // Filters have been set, and there are no results
        // Filters have not been set, and there are no results (default state)

        if (this.props.shouldOnlyUpdateWithFilters && !this.hasFilters()) {
            return ['No filters have been set', 'Adjust the filters above to display results'];
        }

        if (this.hasFilters()) {
            return ['No results found with these filters', 'Adjust the filters above to display results'];
        }

        return [];
    }

    setFilterVisibility(isFiltersVisible = true) {
        this.setState({ isFiltersVisible });
    }

    hasFilters(search) {
        const parsed = parseSearch(typeof search === 'undefined' ? this.props.location.search : search);

        if (!parsed.filter || typeof parsed.filter !== 'object') {
            return false;
        }

        return Boolean(Object.values(parsed.filter).filter(item => item !== '').length);
    }

    resetFilters() {
        const { pathname } = this.props.location;
        return this.props.history.push(`${pathname}`);
    }

    updateData(data) {
        this.setState({ data });
    }

    updateRow(row) {
        this.setState({
            data: this.state.data.map((item) => {
                if (row.$id !== item.id && row.id !== item.id) {
                    return item;
                }
                return { ...row };
            }),
        });
    }

    renderList() {
        // (Report collections have data as an object of 'data's, so it's important to check both)

        const data = this.state.data && this.props.actions ? this.state.data.map(item => ({
            ...item,
            $actions: this.props.actions,
        })) : this.state.data;

        const hasData = Boolean((
            Array.isArray(data) && data.length
        ) || (
            typeof data === 'object'
                && data !== null
                && Object.values(data).length
                && Object.values(data)[0].data.length
        ));

        // If the data is loading, this trumps everything else

        let isDisabled = false;

        if (this.state.isDataLoading) {
            if (hasData) {
                isDisabled = true;
            } else {
                return [<Loading />, data, hasData];
            }
        }

        // If there is no data, display an empty message. It's up to the emptylist function to decide
        // what message to display

        if (!hasData) {
            const [emptyTitle, emptyDescription] = this.getEmptyList();
            return [
                <EmptyList title={emptyTitle} description={emptyDescription} />, data, hasData
            ];
        }

        // We have data and our list isn't in a loading state. Display the list.

        return [this.props.renderList({
            data,
            columns: this.state.columns,
            totals: this.state.totals,
            transformer: this.props.transformer,
            isDisabled: this.props.isDisabled || isDisabled,
            shouldInitPreload: this.props.shouldInitPreload,
            functions: {
                updateData: this.updateData,
                updateRow: this.updateRow,
                reloadData: () => this.getData(this.state.search),
            },
        }), data, hasData];
    }

    render() {
        if (this.state.dataError) {
            if (this.state.dataError.response.status === 403) {
                return (
                    <ErrorMessage
                        title="Not Allowed"
                        description="You do not have permission to view this page.
                            Please contact the site administrator"
                    />
                );
            }
            return (<ErrorMessage />);
        }

        const [list, data, hasData] = this.renderList();

        return (
            <ErrorBoundary>
                {(this.props.filters || this.props.cta || this.props.hasSearch) && (
                    <Fragment>
                        <FilterBar
                            location={this.props.location}
                            history={this.props.history}
                            filters={this.props.filters}
                            quickFilters={this.props.quickFilters}
                            itemName={this.props.itemName}
                            hasSearch={this.props.hasSearch}
                            cta={this.props.cta}
                            isVisible={this.state.isFiltersVisible}
                            setVisibility={this.setFilterVisibility}
                        />
                        <FilterSummary
                            location={this.props.location}
                            filterMap={this.props.filterMap}
                            resetFilters={this.resetFilters}
                        />
                    </Fragment>
                )}

                {list}

                {!this.state.isDataLoading && this.state.meta && (
                    <Pagination data={this.state.meta} location={this.props.location} />
                )}
                {Boolean(this.props.footer) && hasData && this.props.footer()}
            </ErrorBoundary>
        );
    }
}

ConnectedListComponent.propTypes = {
    ...withConnected,
    ...withHistory,
    ...withLocation,
    filters: PropTypes.func,
    filterMap: PropTypes.shape({}),
    itemName: PropTypes.string,
    renderList: PropTypes.func,
    hasSearch: PropTypes.bool,
    cta: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        action: PropTypes.func.isRequired,
    })),
    shouldOnlyUpdateWithFilters: PropTypes.bool,
    shouldInitPreload: PropTypes.bool,
    setFunctions: PropTypes.func,
    transformData: PropTypes.func,
};

ConnectedListComponent.defaultProps = {
    ...defaultWithConnected,
    filters: null,
    filterMap: {},
    itemName: null,
    renderList: data => <List {...data} />,
    hasSearch: false,
    cta: null,
    shouldOnlyUpdateWithFilters: false,
    shouldInitPreload: true,
    setFunctions: () => null,
    transformData: (data) => data,
};

export default withRouter(ConnectedListComponent);
