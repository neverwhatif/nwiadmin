import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import DropdownInput from './dropdowninput';
import DropdownList from './dropdownlist';
import DropdownClear from './dropdownclear';

import styles from './styles.scss';

const transformData = (data, transformer) => (
    data.map(item => transformer(item)).filter(item => Boolean(`${item.name}`.replace(/ /g, '')))
);

const getValue = (props) => {
    if (!props.value && props.value !== 0) {
        return null;
    }

    const transformed = transformData(props.data, props.transformer);
    const selected = transformed.filter(item => `${item.id}` === `${props.value}`)[0];

    return selected ? selected.name : props.placeholder;
};

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isListOpen: false,
            value: props.isLoading ? null : getValue(props),
        };

        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.openList = this.openList.bind(this);
        this.closeList = this.closeList.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.clearItem = this.clearItem.bind(this);
    }

    componentWillMount() {
        document.addEventListener('click', this.handleClickOutside, false);
    }

    componentWillReceiveProps(newProps) {
        if (this.props.value !== newProps.value) {
            this.setState({ value: getValue(newProps) });
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, false);
    }

    handleClickOutside(e) {
        if (this.node.contains(e.target)) {
            return;
        }
        this.closeList();
    }

    openList() {
        this.setState({ isListOpen: true });
    }

    closeList() {
        this.setState({ isListOpen: false });
    }

    selectItem(item) {
        const target = {
            name: this.props.name,
            value: item.id,
        };

        this.setState({ value: item.name });
        this.props.onChange({ target, item });
        this.closeList();
    }

    clearItem() {
        const target = {
            name: this.props.name,
            value: null,
        };

        this.setState({ value: null });
        this.props.onChange({ target });
    }

    render() {
        const transformed = transformData(this.props.data, this.props.transformer);
        const rootClass = classNames(
            styles.root,
            this.props.isLoading || this.props.isDisabled || !transformed.length ? styles.rootDisabled : null,
        );

        const noResultsLabel = `No ${this.props.label ? this.props.label : 'Result'}s`;
        const placeholder = !transformed.length ? noResultsLabel : this.props.placeholder;

        return (
            <div className={rootClass} ref={(node) => { this.node = node; }}>
                <DropdownInput
                    onClick={this.openList}
                    text={this.state.value !== null ? this.state.value : placeholder}
                    isLoading={this.props.isLoading}
                    hasError={this.props.hasError}
                />

                <DropdownList data={transformed} onItemClick={this.selectItem} isOpen={this.state.isListOpen} />
                {this.state.value !== null && (<DropdownClear onClick={this.clearItem} />)}
            </div>
        );
    }
}

Dropdown.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })).isRequired,
    label: PropTypes.string,
    // We can't make this required as FormField doesn't set the name fast enough. Probably needs a fix.
    name: PropTypes.string,
    isLoading: PropTypes.bool,
    isDisabled: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    transformer: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
};

Dropdown.defaultProps = {
    label: '',
    name: '',
    isLoading: false,
    isDisabled: false,
    placeholder: 'Select...',
    onChange: () => null,
    transformer: item => item,
    value: null,
};

export default Dropdown;
