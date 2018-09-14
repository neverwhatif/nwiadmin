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
        const { target: { name, value } } = e;

        this.setState({ value });

        const parsedValue = parseDate(value);
        const fakeEvent = { target: { name, value: parsedValue } };

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

        return (
            <div className={styles.root} ref={(node) => { this.node = node; }}>
                <TextInput
                    {...this.props}
                    autoComplete="off"
                    onFocus={this.openPanel}
                    onChange={e => this.onChange(e)}
                    value={this.state.value}
                />
                <div className={panelClass}>
                    <DateInputPanel
                        initialValue={this.props.value}
                        onSelectDate={date => this.onSelectDate(date)}
                        active={this.state.value}
                    />
                </div>
            </div>
        );
    }
}

DateInput.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

DateInput.defaultProps = {
    name: '',
    value: '',
    onChange: () => null,
};

export default DateInput;
