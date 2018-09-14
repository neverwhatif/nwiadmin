import React from 'react';

import Dropdown from '../dropdown';

const startYear = 2016;
const endYear = (new Date()).getFullYear();

const data = [];
for (let id = startYear; id <= endYear; id += 1) {
    data.push({ id, name: `${id}` });
}

const YearDropdown = props => (
    <Dropdown {...props} data={data} />
);

export default YearDropdown;
