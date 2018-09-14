import React from 'react';
import { shallow } from 'enzyme';

import TableHead from './index';

const data = {
    $id: 1,
    Title: 'Lorem',
};

describe('TableHead', () => {
    const component = shallow(<TableHead data={data} />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
    it('should render cells', () => {
        expect(component.find('th').length).toBe(1); // Don't include $id
        expect(component.find('th').first().text()).toBe('Title');
    });
});
