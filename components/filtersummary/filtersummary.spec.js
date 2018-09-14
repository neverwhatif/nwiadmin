import React from 'react';
import { shallow } from 'enzyme';

import FilterSummary from './index';

const mockLocation = {
    pathname: '/lorem',
    search: '',
};

describe('FilterSummary', () => {
    const component = shallow(<FilterSummary location={mockLocation} />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
});
