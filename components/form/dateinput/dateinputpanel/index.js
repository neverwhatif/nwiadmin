import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import DateInputCal from '../dateinputcal';

import styles from './styles.scss';

const getMonthFromDate = (value) =>
    (value ? moment(value, 'YYYY-MM-DD') : moment()).format('YYYY-MM');

const DateInputPanel = ({ active, disabledFn, initialValue, onSelectDate }) => {
    const [activeValue, setActiveValue] = useState(initialValue);
    const [month, setMonth] = useState(getMonthFromDate(initialValue));

    const handlePreviousMonth = () => {
        setMonth(
            moment(`${month}-01`)
                .subtract(1, 'month')
                .format('YYYY-MM')
        );
    };

    const handleNextMonth = () => {
        setMonth(
            moment(`${month}-01`)
                .add(1, 'month')
                .format('YYYY-MM')
        );
    };

    const monthName = moment(`${month}-01`).format('MMMM YYYY');

    useEffect(() => {
        const newActiveValue = active.match(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/)
            ? moment(active, 'DD/MM/YYYY').format('YYYY-MM-DD')
            : null;

        setActiveValue(newActiveValue);

        if (newActiveValue) {
            setMonth(getMonthFromDate(newActiveValue));
        }
    }, [active]);

    return (
        <div className={styles.root}>
            <div className={styles.title}>
                <p className={styles.titleText}>{monthName}</p>
            </div>
            <DateInputCal
                month={month}
                onSelectDate={onSelectDate}
                active={activeValue}
                disabledFn={disabledFn}
            />
            <div className={styles.actions}>
                <button className={styles.button} onClick={handlePreviousMonth}>
                    ←
                </button>
                <button className={styles.button} onClick={handleNextMonth}>
                    →
                </button>
            </div>
        </div>
    );
};

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
