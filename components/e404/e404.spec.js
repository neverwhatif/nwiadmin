import React from 'react';
import { shallow } from 'enzyme';

import E404 from './index';

describe('E404', () => {
    const component = shallow(<E404 />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
    it('should render text', () => {
        expect(component.text()).toBe('E404');
    });
});
