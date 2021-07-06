import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import DropdownInput from './dropdowninput';
import DropdownList from './dropdownlist';
import DropdownClear from './dropdownclear';

import styles from './styles.scss';

const transformData = (data, transformer) =>
    data
        .map((item) => transformer(item))
        .filter((item) => Boolean(`${item.name}`.replace(/ /g, '')));

const transformValue = (data, transformer, placeholder, value) => {
    if (value === false || value === null) {
        return null;
    }

    const transformed = transformData(data, transformer);
    const selected = transformed.filter((item) => `${item.id}` === `${value}`)[0];

    return selected ? selected.name : placeholder;
};

const Dropdown = ({
    data,
    label,
    name,
    placeholder,
    transformer,
    value,
    hasError,
    isDisabled,
    isLoading,
    onChange,
}) => {
    const node = useRef(null);
    const [isListOpen, setListOpen] = useState(false);

    const handleClickOutside = (event) => {
        if (node.current.contains(event.target)) {
            return;
        }
        setListOpen(false);
    };

    const handleChange = (item) => {
        const target = {
            name,
            value: item.id,
        };

        onChange({ target, item });
        setListOpen(false);
    };

    const handleClear = () => {
        const target = {
            name,
            value: null,
        };

        onChange({ target });
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, false);

        return () => {
            document.removeEventListener('click', handleClickOutside, false);
        };
    }, []);

    const noResultsLabel = `No ${label ? label : 'Result'}s`;

    const transformedValue = transformValue(data, transformer, placeholder, value);
    const transformedData = transformData(data, transformer);
    const transformedPlaceholder = !transformedData.length ? noResultsLabel : placeholder;

    const rootClass = classNames(
        styles.root,
        isListOpen ? styles.rootOpen : null,
        isLoading || isDisabled || !transformedData.length ? styles.rootDisabled : null
    );

    return (
        <div className={rootClass} ref={node}>
            <DropdownInput
                onClick={() => setListOpen(true)}
                text={transformedValue !== null ? transformedValue : transformedPlaceholder}
                isLoading={isLoading}
                hasError={hasError}
            />

            <DropdownList data={transformedData} onItemClick={handleChange} isOpen={isListOpen} />
            {transformedValue !== null && transformedValue !== placeholder && <DropdownClear onClick={handleClear} />}
        </div>
    );
};

Dropdown.displayName = 'Dropdown';

Dropdown.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        })
    ).isRequired,
    label: PropTypes.string,
    // We can't make this required as FormField doesn't set the name fast enough. Probably needs a fix.
    name: PropTypes.string,
    isLoading: PropTypes.bool,
    isDisabled: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    transformer: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Dropdown.defaultProps = {
    label: '',
    name: '',
    isLoading: false,
    isDisabled: false,
    placeholder: 'Select...',
    onChange: () => null,
    transformer: (item) => item,
    value: null,
};

export default Dropdown;
