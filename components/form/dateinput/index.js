import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';

import { formatDate } from 'nwiadmin/utility/formatters';

import TextInput from '../textinput';
import DateInputPanel from './dateinputpanel';

import styles from './styles.scss';

const parseDate = (date) => {
    if (!date.match(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/)) {
        return date;
    }
    return moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
};

class DateInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPanelOpen: false,
            value: formatDate(props.value),
        };

        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.openPanel = this.openPanel.bind(this);
        this.closePanel = this.closePanel.bind(this);
    }

    componentWillMount() {
        document.addEventListener('click', this.handleClickOutside, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, false);
    }

    onChange(e) {
        const { target: { value } } = e;

        this.setState({ value });

        const parsedValue = parseDate(value);
        const fakeEvent = { target: { name: this.props.name, value: parsedValue } };

        this.props.onChange(fakeEvent);
    }

    onSelectDate(value) {
        this.setState({ value: formatDate(value) });
        this.props.onChange({ target: { name: this.props.name, value } });
        this.closePanel();
    }

    handleClickOutside(e) {
        if (this.node.contains(e.target)) {
            return;
        }
        this.closePanel();
    }

    openPanel() {
        this.setState({ isPanelOpen: true });
    }

    closePanel() {
        this.setState({ isPanelOpen: false });
    }

    render() {
        const panelClass = classNames(styles.panel, this.state.isPanelOpen ? styles.panelIsOpen : null);
        const { disabledFn, ...otherProps } = this.props;

        return (
            <div className={styles.root} ref={(node) => { this.node = node; }}>
                <TextInput
                    {...this.otherProps}
                    className={styles.input}
                    autoComplete="off"
                    onFocus={this.openPanel}
                    onChange={e => this.onChange(e)}
                    value={this.state.value}
                />
                <div className={panelClass}>
                    <DateInputPanel
                        initialValue={this.props.value ? this.props.value.split(' ')[0] : ''}
                        onSelectDate={date => this.onSelectDate(date)}
                        active={this.state.value}
                        disabledFn={disabledFn}
                    />
                </div>
                <button type="button" className={styles.control} onClick={this.openPanel}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" strokeWidth="2">
                        <rect x="1" y="3" width="12" height="10" />
                        <line x1="3" y1="0" x2="3" y2="3"/>
                        <line x1="11" y1="0" x2="11" y2="3"/>
                        <line x1="0" y1="6" x2="14" y2="6"/>
                    </svg>
                </button>
            </div>
        );
    }
}

DateInput.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    disabledFn: PropTypes.func,
};

DateInput.defaultProps = {
    name: '',
    value: '',
    onChange: () => null,
    disabledFn: () => false,
};

export default DateInput;
