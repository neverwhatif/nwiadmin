import React from 'react';

import { months } from 'nwiadmin/utility/constants';
import Dropdown from '../dropdown';

const data = months.map((item, index) => ({
    id: index + 1,
    name: item,
}));

const MonthDropdown = props => (
    <Dropdown {...props} data={data} />
);

export default MonthDropdown;
