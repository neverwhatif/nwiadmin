import React from 'react';
import { shallow } from 'enzyme';

import ReportCollection from './index';

jest.mock('nwiadmin/components/layout', () => ({ Column: 'Column', Row: 'Row' }));
jest.mock('../reportcollectionitem', () => 'CollectionItem');

describe('ReportCollection', () => {
    const component = shallow(<ReportCollection />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
});
