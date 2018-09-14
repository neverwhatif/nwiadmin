import React from 'react';
import { shallow } from 'enzyme';

import ReportCollectionItem from './index';

jest.mock('nwiadmin/components/table', () => 'Table');
jest.mock('../reportcollectionpanel', () => 'ReportCollectionPanel');

const mockColumns = [{
    key: 'lorem',
}, {
    key: 'ipsum',
}];

const mockData = [{
    lorem: 1, ipsum: 2,
}, {
    lorem: 3, ipsum: 4,
}];

describe('ReportCollectionItem', () => {
    const component = shallow(<ReportCollectionItem columns={mockColumns} data={mockData} name="Lorem" />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
});
