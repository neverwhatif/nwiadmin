import React from 'react';
import { shallow } from 'enzyme';

import ReportCollectionPanel from './index';

describe('ReportCollectionPanel', () => {
    const component = shallow(<ReportCollectionPanel><div /></ReportCollectionPanel>);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
});
