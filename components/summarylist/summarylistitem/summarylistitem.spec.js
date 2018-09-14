import React from 'react';
import { shallow } from 'enzyme';

import SummaryListItem from './index';

describe('SummaryListItem', () => {
    const component = shallow(<SummaryListItem term="Lorem" def="Ipsum" />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
    it('should render a term', () => {
        expect(component.find('dt').text()).toBe('Lorem');
    });
    it('should render a def', () => {
        expect(component.find('dd').text()).toBe('Ipsum');
    });
});
