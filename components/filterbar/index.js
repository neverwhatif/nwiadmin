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

class FilterBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: props.location.search ? getFiltersFromLocation(props.location.search) : {},
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
        this.setState({ filter: getFiltersFromLocation(search) });
    }

    submitFilters() {
        const { pathname } = this.props.location;
        const search = {
            filter: { ...this.state.filter },
        };

        this.props.setVisibility(false);
        this.props.history.push(`${pathname}?${stringifySearch(search)}`);
    }

    render() {
        const {
            cta,
            filters,
            itemName,
            hasSearch,
            sort,
        } = this.props;

        const modalTitle = `Search & Filter ${itemName ? `${ucwords(itemName)}s` : ''}`;

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
                        {sort && <Dropdown data={{}} name="sort" placeholder="Sort by..." />}
                        {filters && <Button onClick={() => this.props.setVisibility()}>Filters...</Button>}
                        {cta && <FilterBarCta data={cta} location={this.props.location} />}
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
