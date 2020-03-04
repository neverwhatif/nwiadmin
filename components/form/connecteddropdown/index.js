import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { parseRemote } from 'nwiadmin/utility';
import { withConnected, defaultWithConnected } from 'nwiadmin/utility/proptypes';

import { get } from 'nwiadmin/services/api';

import { Dropdown } from 'nwiadmin/components/form';

const ConnectedDropdown = ({ allOption, remote, ...otherProps }) => {
    const [data, setData] = useState({});
    const [dataError, setDataError] = useState('');
    const [isDataLoading, setDataLoading] = useState(true);

    const getData = async () => {
        setDataLoading(true);

        const parsedRemote = parseRemote(remote);

        try {
            const response = await get(parsedRemote.alias, parsedRemote.params);
            setData(allOption ? [{ id: '', name: allOption }, ...response.data] : response.data);
        } catch (err) {
            setDataError(err.toString());
        }

        setDataLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    if (dataError) {
        return <div>Error: {dataError}</div>;
    }

    if (isDataLoading) {
        return <Dropdown data={[]} isLoading />;
    }

    return <Dropdown data={data} {...otherProps} />;
};

ConnectedDropdown.propTypes = {
    ...withConnected,
    transformer: PropTypes.func,
};

ConnectedDropdown.defaultProps = {
    ...defaultWithConnected,
    transformer: (item) => item,
};

export default ConnectedDropdown;
