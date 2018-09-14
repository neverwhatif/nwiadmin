import React from 'react';
import { shallow } from 'enzyme';

import SummaryList from './index';

jest.mock('./summarylistitem', () => 'SummaryListItem');

const data = {
    Lorem: 'Lorem',
    Ipsum: 'Ipsum',
};

describe('SummaryList', () => {
    const component = shallow(<SummaryList data={data} />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
    it('should render list items', () => {
        expect(component.find('SummaryListItem').length).toBe(2);
    });
});
