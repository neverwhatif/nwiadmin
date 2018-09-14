import React from 'react';
import { shallow } from 'enzyme';

import FilterBarCta from './index';

jest.mock('nwiadmin/components/button', () => 'Button');

const mockData = [{
    label: 'Lorem',
    action: () => jest.fn(),
}, {
    label: 'Ipsum',
    action: () => jest.fn(),
}];

describe('FilterBarCta', () => {
    const component = shallow(<FilterBarCta data={mockData} />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
});
