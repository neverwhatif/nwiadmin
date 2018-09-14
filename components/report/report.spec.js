import React from 'react';
import { shallow } from 'enzyme';

import Report from './index';

describe('Report', () => {
    const component = shallow(<Report code="lorem" />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
});
