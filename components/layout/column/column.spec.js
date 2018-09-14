import React from 'react';
import { shallow } from 'enzyme';

import Column from './index';

describe('Column', () => {
    const component = shallow(<Column><p /></Column>);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
    it('should render children', () => {
        expect(component.find('p').length).toBe(1);
    });
});
