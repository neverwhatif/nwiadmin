import React, { useEffect, useRef, useState } from 'react';
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

const DateInput = ({ disabledFn, hasError, name, value, onChange }) => {
    const node = useRef(null);

    const [isPanelOpen, setPanelOpen] = useState(false);
    const [dateValue, setDateValue] = useState(formatDate(value));

    const handleClickOutside = (event) => {
        if (node.current.contains(event.target)) {
            return;
        }
        setPanelOpen(false);
    };

    const handleChange = (event) => {
        setDateValue(event.target.value);

        const parsedValue = parseDate(event.target.value);
        onChange({ target: { name, value: parsedValue } });
    };

    const handleSelect = (value) => {
        setDateValue(formatDate(value));

        onChange({ target: { name, value } });
        setPanelOpen(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, false);

        return () => {
            document.removeEventListener('click', handleClickOutside, false);
        };
    }, []);

    const panelClass = classNames(styles.panel, isPanelOpen ? styles.panelIsOpen : null);

    return (
        <div className={styles.root} ref={node}>
            <TextInput
                name={name}
                className={styles.input}
                autoComplete="off"
                value={dateValue}
                hasError={hasError}
                onFocus={() => setPanelOpen(true)}
                onChange={handleChange}
            />
            <div className={panelClass}>
                <DateInputPanel
                    initialValue={dateValue ? dateValue.split(' ')[0] : ''}
                    onSelectDate={handleSelect}
                    active={dateValue}
                    disabledFn={disabledFn}
                />
            </div>
            <button type="button" className={styles.control} onClick={() => setPanelOpen(true)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    strokeWidth="2"
                >
                    <rect x="1" y="3" width="12" height="10" />
                    <line x1="3" y1="0" x2="3" y2="3" />
                    <line x1="11" y1="0" x2="11" y2="3" />
                    <line x1="0" y1="6" x2="14" y2="6" />
                </svg>
            </button>
        </div>
    );
};

DateInput.displayName = 'DateInput';

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
