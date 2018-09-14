import React from 'react';

import { quarters } from 'nwiadmin/utility/constants';
import Dropdown from '../dropdown';

const data = quarters.map((item, index) => ({
    id: index + 1,
    name: item,
}));

const QuarterDropdown = props => (
    <Dropdown {...props} data={data} />
);

export default QuarterDropdown;
