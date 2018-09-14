import React from 'react';
import { shallow } from 'enzyme';

import PaginationSummary from './index';

describe('PaginationSummary', () => {
    const component = shallow(<PaginationSummary from={1} to={10} total={50} />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
    it('should render text', () => {
        expect(component.text()).toBe('1 - 10 of 50');
    });
});
