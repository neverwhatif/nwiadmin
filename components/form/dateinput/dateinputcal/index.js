import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

import styles from './styles.scss';

const adjustDoW = (num) => (num === 0 ? 6 : num - 1);

const getWeeks = (month) => {
    const firstDay = `${month}-01`;

    const firstDayofMonth = adjustDoW(moment(firstDay, 'YYYY-MM-DD').day());
    const daysInMonth = moment(month, 'YYYY-MM').daysInMonth();
    const lastDayofMonth = adjustDoW(
        moment(firstDay, 'YYYY-MM-DD')
            .add(daysInMonth - 1, 'days')
            .day()
    );

    const beforeDays = Array(firstDayofMonth).fill(0);
    const actualDays = Array(!daysInMonth || isNaN(daysInMonth) ? 31 : daysInMonth)
        .fill(0)
        .map((item, index) => {
            const date = `${month}-${index + 1 < 10 ? '0' : ''}${index + 1}`;

            return {
                num: index + 1,
                date,
            };
        });
    const afterDays = Array(6 - lastDayofMonth).fill(0);

    const days = [...beforeDays, ...actualDays, ...afterDays];
    const weeks = [];

    for (let i = 0, j = days.length; i < j; i += 7) {
        weeks.push(days.slice(i, i + 7));
    }

    return weeks.filter((week) => JSON.stringify(week) !== '[0,0,0,0,0,0,0]');
};

const renderCell = (day, onSelectDate, active, disabledFn, index) => {
    const cellClass = classNames(
        styles.cell,
        active !== null && typeof active !== 'undefined' && day.date === active
            ? styles.cellActive
            : null,
        disabledFn(moment(day.date, 'YYYY-MM-DD')) ? styles.cellDisabled : null
    );

    return (
        <td key={index} className={cellClass}>
            {day !== 0 ? (
                <button className={styles.control} onClick={() => onSelectDate(day.date)}>
                    {day.num}
                </button>
            ) : (
                ''
            )}
        </td>
    );
};

const DateInputCal = ({ month, onSelectDate, active, disabledFn }) => {
    const weeks = getWeeks(month);
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
        <table className={styles.root}>
            <thead>
                <tr>
                    {dayNames.map((name) => (
                        <th className={styles.head} key={name}>
                            {name}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {weeks.map((week) => (
                    <tr key={week[0].num || 0} className={styles.row}>
                        {week.map((day, index) =>
                            renderCell(day, onSelectDate, active, disabledFn, index)
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

DateInputCal.propTypes = {
    month: PropTypes.string.isRequired,
    onSelectDate: PropTypes.func,
    active: PropTypes.string,
    disabledFn: PropTypes.func.isRequired,
};

DateInputCal.defaultProps = {
    onSelectDate: () => null,
    active: '',
};

export default DateInputCal;
