import React from 'react';
import { shallow } from 'enzyme';

import Loading from './index';

describe('Loading', () => {
    const component = shallow(<Loading />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
});
