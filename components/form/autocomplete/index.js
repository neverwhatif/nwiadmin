import React, { useState } from 'react';

import { parseRemote } from 'nwiadmin/utility';
import { get } from 'nwiadmin/services/api';

import TextInput from '../textinput';
import DropdownList from '../dropdown/dropdownlist';

import styles from './styles.scss';

const Autocomplete = ({ initialValue, name, remote, onChange }) => {
    const [data, setData] = useState([]);
    const [value, setValue] = useState(initialValue || '');

    const handleSelect = (item) => {
        setData([]);
        setValue(item.name);

        onChange({ target: { name, value: item.id } });
    };

    const getData = async (event) => {
        setValue(event.target.value);

        const parsedRemote = parseRemote(remote);

        const params = {
            ...parsedRemote.params,
            filter: { ...parsedRemote.params.filter, search: event.target.value },
        };

        try {
            const response = await get(parsedRemote.alias, params, { cancellable: true });
            setData(response.data || data);
        } catch (err) {}
    };

    return (
        <div className={styles.root}>
            <TextInput
                value={value}
                onChange={(event) => getData(event)}
                placeholder="Start typing..."
            />
            <DropdownList data={data} isOpen={Boolean(data.length)} onItemClick={handleSelect} />
            {value && (
                <button
                    type="button"
                    className={styles.clear}
                    onClick={() => handleSelect({ name: '', id: null })}
                >
                    &times;
                </button>
            )}
        </div>
    );
};

export default Autocomplete;
