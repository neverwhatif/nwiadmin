import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';

import DateInputCal from '../dateinputcal';

import styles from './styles.scss';

const getMonthFromDate = value =>  (value ? moment(value, 'YYYY-MM-DD') : moment()).format('YYYY-MM');

class DateInputPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: props.initialValue,
            month: getMonthFromDate(props.initialValue),
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.active !== this.props.active) {
            this.setState({
                active: newProps.active.match(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/)
                    ? moment(newProps.active, 'DD/MM/YYYY').format('YYYY-MM-DD')
                    : null,
            });
        }
        if (this.state.active) {
            this.setState({ month: getMonthFromDate(this.state.active) });
        }
    }

    onSelectDate(date) {
        this.props.onSelectDate(date);
    }

    previousMonth() {
        const month = moment(`${this.state.month}-01`).subtract(1, 'month').format('YYYY-MM');
        this.setState({ month });
    }

    nextMonth() {
        const month = moment(`${this.state.month}-01`).add(1, 'month').format('YYYY-MM');
        this.setState({ month });
    }

    render() {
        const monthName = moment(`${this.state.month}-01`).format('MMMM YYYY');

        return (
            <div className={styles.root}>
                <div className={styles.title}>
                    <p className={styles.titleText}>{monthName}</p>
                </div>
                <DateInputCal
                    month={this.state.month}
                    onSelectDate={date => this.onSelectDate(date)}
                    active={this.state.active}
                    disabledFn={this.props.disabledFn}
                />
                <div className={styles.actions}>
                    <button className={styles.button} onClick={() => this.previousMonth()}>← Previous</button>
                    <button className={styles.button} onClick={() => this.nextMonth()}>Next →</button>
                </div>
            </div>
        );
    }
}

DateInputPanel.propTypes = {
    initialValue: PropTypes.string,
    onSelectDate: PropTypes.func,
    active: PropTypes.string,
    isVisible: PropTypes.bool,
    disabledFn: PropTypes.func.isRequired,
};

DateInputPanel.defaultProps = {
    initialValue: '',
    onSelectDate: () => null,
    active: '',
    isVisible: false,
};

export default DateInputPanel;
