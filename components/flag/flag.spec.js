import React from 'react';
import { shallow } from 'enzyme';

import Flag from './index';

describe('Flag', () => {
    const component = shallow(<Flag>Lorem</Flag>);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
});
